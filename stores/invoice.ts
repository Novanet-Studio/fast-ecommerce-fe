import { CreateInvoice } from '~/graphql/mutations';
import { GetProductById, GetInvoicesByUserId } from '~/graphql/queries';
import type { OrderResponseBody } from '@paypal/paypal-js';
import { PaymentReportError, SendInvoiceEmailError } from '~/errors';
import { Payment } from 'square';

const PAGE_LIMIT = 10;
const DEFAULT_PAGE = 1;

interface FetchInvoicesReturn {
  data: Invoice[] | undefined;
  meta: Meta | null;
}

interface Options {
  page: number;
  pageSize: number;
}

type PaymentMethod = 'pago_movil' | 'trans_bofa' | 'zelle' | 'venmo';
type SendEmailFn = (data: any) => Promise<{ message: string; status: number }>;

const DELAY_REDIRECT = 500;

export const useInvoiceStore = defineStore(
  'ecommerce-invoice',
  () => {
    const invoice = ref<any>();
    const invoices = ref<Invoice[]>([]);
    const products = ref<Product[]>([]);
    const loading = ref<boolean>(false);

    const mapped = computed(() => {
      if (!invoices.value.length) return [];

      return invoices.value.map(invoiceMapper);
    });

    const { $httpsCallable, $notify } = useNuxtApp();

    const router = useRouter();
    const graphql = useStrapiGraphQL();
    const authStore = useAuthStore();
    const checkout = useCheckoutStore();
    const productsCart = useProductStore();
    const cart = useCartStore();

    const httpsCallable = $httpsCallable as <T, U>(data: T) => U;

    const sendReceiptEmail = httpsCallable<string, SendEmailFn>(
      'sendReceiptEmail'
    );

    const sendMerchantEmail = httpsCallable<string, SendEmailFn>(
      'sendMerchantEmail'
    );

    async function fetchInvoices(
      userId: string,
      options?: Options
    ): Promise<FetchInvoicesReturn> {
      const graphql = useStrapiGraphQL();
      const id = Number(userId);

      const response = await graphql<InvoicesRequest>(GetInvoicesByUserId, {
        id,
        page: options?.page ?? DEFAULT_PAGE,
        pageSize: options?.pageSize ?? PAGE_LIMIT,
      });

      if (!response.data.invoices?.data?.length) {
        return {
          data: [],
          meta: null,
        };
      }

      const mapped = mapperData<Invoice[]>(response.data.invoices.data);

      invoices.value = mapped;

      return {
        data: mapped,
        meta: response.data.invoices.meta,
      };
    }

    async function loadInvoiceProducts() {
      try {
        loading.value = true;
        const graphql = useStrapiGraphQL();
        const temp: Product[] = [];

        if (!invoice.value?.products.length) return [];

        const itemsId = invoice.value.products.map(
          (product: Product) => product.id
        );

        const productPromises = itemsId.map((id: string) =>
          graphql<ProductRequest>(GetProductById, { id })
        );

        const response = await Promise.all(productPromises);
        const result = mapperData<any[]>(response);

        result.forEach((product) => {
          temp.push(product.products[0]);
        });

        products.value = temp;
      } catch (error: any) {
        throw new Error(error);
      } finally {
        loading.value = false;
      }
    }

    async function createPaypalInvoice(
      order: OrderResponseBody,
      items: CartItem[]
    ) {
      const productList = productsCart.cartProducts;
      const productsFiltered: ProductBuyed[] = [];

      items.forEach((product) => {
        const found = productList?.find((item) => item?.id === product.id);

        if (found) {
          productsFiltered.push({
            product: product.id,
            quantity: Number(product.quantity),
          });
        }
      });

      const orderAddress = order.purchase_units[0].shipping?.address;
      const address = {
        phone: checkout.phone,
        home: checkout.home,
        country: orderAddress?.country_code,
        locality: orderAddress?.admin_area_2,
        postalCode: orderAddress?.postal_code,
        addressLine1: orderAddress?.address_line_1,
      };

      const paymentInfo = {
        name: order.payer.name?.given_name,
        lastname: order.payer.name?.surname,
        email: order.payer.email_address,
        confirmation: order.id,
        amount: +order.purchase_units[0].amount.value,
        payment_date: getDate(order.create_time),
      };

      const body = {
        amount: +order.purchase_units[0].amount.value,
        order_id: order.purchase_units[0].invoice_id,
        paid: true,
        payment_id: order.id,
        products: productsFiltered,
        user: authStore.user.id.toString(),
        shippingAddress: address,
        fullName: checkout.fullName,
        cardType: 'no aplica',
        cardKind: 'no aplica',
        cardLast: 'no aplica',
        payment_info: [paymentInfo],
        payment_method: 'paypal',
      };

      const { data } = await graphql<InvoicesRequest>(CreateInvoice, {
        invoice: body,
      });

      return data;
    }

    async function createInvoiceReport(
      payment: PaymentObject,
      products: any[],
      method: PaymentMethod
    ) {
      try {
        const productList = productsCart.cartProducts;
        const productsFiltered: ProductBuyed[] = [];

        products.forEach((product) => {
          const found = productList?.find((item) => item?.id === product.id);

          if (found) {
            productsFiltered.push({
              product: product.id,
              quantity: Number(product.quantity),
              // name_product: found.name,
            });
          }
        });

        const mapperToStrapiObject = (
          payment: PaymentObject
        ): PaymentStrapi => ({
          name: payment.name,
          lastname: payment.lastname,
          confirmation: payment.confirmation,
          amount: +payment.amount,
          payment_date: payment.paymentDate,
          email: checkout.email,
        });

        const addressData = {
          phone: checkout.phone,
          home: checkout.home,
          country: checkout.country,
          locality: checkout.city,
          postalCode: checkout.zipCode,
          addressLine1: checkout.address,
        };

        const paymentInfo = mapperToStrapiObject(payment);

        const data = {
          // Amount in USD
          amount: cart.amount,
          order_id: payment.orderId,
          paid: false,
          payment_id: payment.confirmation,
          products: productsFiltered,
          user: authStore.user.id.toString(),
          shippingAddress: addressData,
          fullName: checkout.fullName,
          cardType: 'no aplica',
          cardKind: 'no aplica',
          cardLast: 'no aplica',
          payment_info: [paymentInfo],
          payment_method: method,
        };

        const result = await graphql<CreateInvoiceRequest>(CreateInvoice, {
          invoice: data,
        });

        return result;
      } catch (error) {
        throw new PaymentReportError('An error occurred while sending report');
      }
    }

    async function createVisaInvoice(payment: Payment, products: CartItem[]) {
      try {
        const productList = productsCart.cartProducts;
        const productsFiltered: ProductBuyed[] = [];

        products.forEach((product) => {
          const find = productList!.find((item) => item!.id === product.id);

          if (find) {
            productsFiltered.push({
              product: product.id,
              quantity: Number(product.quantity),
            });
          }
        });

        const addressData = {
          phone: checkout.phone,
          home: checkout.home,
          country: payment.shippingAddress?.country,
          locality: payment.shippingAddress?.locality,
          postalCode: payment.shippingAddress?.postalCode,
          addressLine1: payment.shippingAddress?.addressLine1,
        };

        const paymentInfo: PaymentStrapi = {
          name: checkout.name,
          lastname: checkout.lastName,
          email: payment.buyerEmailAddress as string,
          confirmation: payment.id as string,
          amount: Number(payment!.totalMoney!.amount) / 100,
          payment_date: getDate(),
        };

        const data = {
          amount: Number(payment!.totalMoney!.amount) / 100,
          order_id: payment.orderId,
          paid: true,
          payment_id: payment.id,
          products: productsFiltered,
          user: authStore.user.id.toString(),
          shippingAddress: addressData,
          fullName: payment.note,
          cardType: payment?.cardDetails?.card?.cardBrand,
          cardKind: payment?.cardDetails?.card?.cardType,
          cardLast: payment?.cardDetails?.card?.last4,
          payment_info: [paymentInfo],
          payment_method: 'squareup',
        };

        const result = await graphql<CreateInvoiceRequest>(CreateInvoice, {
          invoice: data,
        });

        return result;
      } catch (error) {
        throw new PaymentReportError('An error occurred while sending report');
      }
    }

    function getEmailTemplate(products: any[]): string {
      let emailContent = '';
      const productList = [];

      products.forEach((item) => {
        const productFinded = productsCart.cartProducts!.find(
          (product) => product!.id == item.id
        );

        if (productFinded) {
          productList.push({
            quantity: item.quantity,
            name: productFinded.name,
            amount: item.price,
            description: productFinded.description,
          });

          emailContent += emailTemplate({
            name: productFinded.name,
            price: item.price,
            quantity: item.quantity,
          });
        }
      });

      return emailContent;
    }

    const getMerchantObject = ({
      payed,
      date,
      content,
      orderId,
    }: EmailObjectParams) => ({
      payed,
      date,
      content,
      email: authStore.user.email,
      phone: checkout.phone,
      shipping: checkout.shippingAddress,
      nameCustomer: checkout.fullName,
      order_id: orderId,
    });

    const getReceiptObject = ({
      payed,
      date,
      content,
      orderId,
      email,
      nameCustomer,
    }: EmailObjectParams) => ({
      payed,
      date,
      content,
      email: email ?? authStore.user.email,
      nameCustomer: nameCustomer ?? checkout.fullName,
      order_id: orderId,
    });

    async function sendEmail(products: any[], payment: PaymentObject) {
      try {
        const emailContent = getEmailTemplate(products);
        const createdDate = new Date(payment.paymentDate).toLocaleDateString();
        const realAmount = payment?.amountRate ? cart.amount : payment.amount;
        const amountPayed = `$${realAmount} USD`;
        const orderId = `${payment.orderId} (PENDIENTE EN APROBACION)`;

        const merchant = getMerchantObject({
          orderId,
          payed: amountPayed,
          date: createdDate,
          content: emailContent,
        });

        const receipt = getReceiptObject({
          orderId,
          payed: amountPayed,
          date: createdDate,
          content: emailContent,
        });

        await Promise.all([
          sendReceiptEmail(receipt),
          sendMerchantEmail(merchant),
        ]);

        $notify({
          group: 'all',
          title: 'Orden de compra generada',
          text: '¡Gracias por preferirnos!',
        });

        setTimeout(() => {
          cart.clear();
          router.push('/invoices');
        }, DELAY_REDIRECT);
      } catch (error) {
        throw new SendInvoiceEmailError('¡Hubo un error al enviar el email!');
      }
    }

    async function sendPaypalEmail(
      order: OrderResponseBody,
      items: CartItem[]
    ) {
      try {
        const emailContent = getEmailTemplate(items);
        const created = new Date(order.create_time).toLocaleDateString();
        const amountPayed = `$${order.purchase_units[0].amount.value.toString()} USD`;

        const merchant = getMerchantObject({
          orderId: order.id,
          payed: amountPayed,
          date: created,
          content: emailContent,
        });

        const receipt = getReceiptObject({
          orderId: order.id,
          payed: amountPayed,
          date: created,
          content: emailContent,
        });

        await Promise.all([
          sendReceiptEmail(receipt),
          sendMerchantEmail(merchant),
        ]);

        $notify({
          group: 'all',
          title: 'Orden de compra generada',
          text: '¡Gracias por preferirnos!',
        });

        setTimeout(() => {
          cart.clear();
          router.push('/invoices');
        }, DELAY_REDIRECT);
      } catch (error) {
        throw new SendInvoiceEmailError('¡Hubo un error al enviar el email!');
      }
    }

    async function sendVisaEmail(products: CartItem[], payment: Payment) {
      try {
        const emailContent = getEmailTemplate(products);
        const created = new Date(payment?.createdAt ?? '').toLocaleDateString();
        const amountPayed = `$${
          Number(payment!.amountMoney!.amount) / 100
        } USD`;

        const merchant = getMerchantObject({
          orderId: payment.id as string,
          payed: amountPayed,
          date: created,
          content: emailContent,
        });

        const receipt = getReceiptObject({
          orderId: payment.id as string,
          payed: amountPayed,
          date: created,
          content: emailContent,
          email: payment.buyerEmailAddress,
          nameCustomer: payment.note,
        });

        await Promise.all([
          sendReceiptEmail(receipt),
          sendMerchantEmail(merchant),
        ]);

        $notify({
          group: 'all',
          title: 'Orden de compra generada',
          text: '¡Gracias por preferirnos!',
        });

        setTimeout(() => {
          cart.clear();
          router.push('/invoices');
        }, DELAY_REDIRECT);
      } catch (error) {
        throw new SendInvoiceEmailError('¡Hubo un error al enviar el email!');
      }
    }

    return {
      invoice,
      invoices,
      products,
      mapped,
      fetchInvoices,
      loadInvoiceProducts,
      createPaypalInvoice,
      createInvoiceReport,
      createVisaInvoice,
      sendEmail,
      sendPaypalEmail,
      sendVisaEmail,
    };
  },
  {
    persist: true,
  }
);
