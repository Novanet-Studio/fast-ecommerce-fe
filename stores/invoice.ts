import { CreateInvoice } from '~/graphql/mutations';
import { GetProductById, GetInvoicesByUserId } from '~/graphql/queries';
import type { OrderResponseBody } from '@paypal/paypal-js';

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

export const useInvoiceStore = defineStore(
  'ecommerce-invoice',
  () => {
    const invoice = ref<Invoice>();
    const invoices = ref<Invoice[]>([]);
    const products = ref<Product[]>([]);
    const loading = ref<boolean>(false);

    const mapped = computed(() => {
      if (!invoices.value.length) return [];

      return invoices.value.map(invoiceMapper);
    });

    const authStore = useAuthStore();
    const checkout = useCheckoutStore();

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
          (product) => product.product_id
        );

        const productPromises = itemsId.map((id) =>
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

    // TODO: Is necessary enable this function to be called in all payment methods
    async function createInvoice(order: OrderResponseBody, items: unknown[]) {
      const graphql = useStrapiGraphQL();
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
        amount: order.purchase_units[0].amount.value,
        payment_date: order.create_time,
      };

      const body = {
        amount: +order.purchase_units[0].amount.value,
        order_id: order.purchase_units[0].invoice_id,
        paid: true,
        payment_id: order.id,
        products: items,
        user_id: +authStore.user.id,
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

    return {
      invoice,
      invoices,
      products,
      mapped,
      fetchInvoices,
      loadInvoiceProducts,
      createInvoice,
    };
  },
  {
    persist: true,
  }
);
