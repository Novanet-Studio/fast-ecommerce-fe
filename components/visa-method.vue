<template>
  <div>
    <form id="payment-form">
      <div class="animate-pulse my-8" v-if="isLoadingCard">
        <div class="w-full h-12 bg-gray-200 rounded-md"></div>
      </div>
      <div id="card-container"></div>
      <div class="visa__terms-wrapper">
        <p class="visa__text">
          By making this purchase you agree to
          <a href="#" class="visa__link">our terms and conditions</a>.
        </p>
        <app-button
          :text="state.isLoading ? '...' : 'Pagar'"
          :disabled="state.cardButtonDisabled"
          ref="btnRef"
        />
      </div>
    </form>
    <div id="payment-status-container"></div>
  </div>
</template>

<script lang="ts" setup>
import {
  createInvoice as CreateInvoice,
  getProductById as GetProductById,
  getAddressByIdAndType as GetAddressByIdAndType,
} from '~/graphql';
import type { Payment } from 'square';
import { AddressType } from '~/types';

interface State {
  card: Square.Card | null;
  productMail: ProductsMapped[];
  productsCart: ProductsMapped[];
}

interface CheckBillingResponse {
  addressLine1: string;
  locality: string;
  postalCode: string;
  country: string;
}

type GeneratePayment = (data: any) => Promise<{ data: Payment }>;
type SendEmailFn = (data: any) => Promise<{ message: string; status: number }>;

const { $store, $notify, $httpsCallable } = useNuxtApp();
const { SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID } = useRuntimeConfig().public;

const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = $store.auth();
const cart = $store.cart();
const product = $store.product();
const checkout = $store.checkout();
const httpsCallable = $httpsCallable as <T, U>(data: T) => U;

const state = reactive<State & Record<any, any>>({
  card: null,
  isLoading: false,
  summary: '',
  productMail: [],
  productHtml: null,
  productsCart: [],
  cardButtonDisabled: false,
});

const isLoadingCard = ref(false);
const btnRef = ref(null);

const checkBilling = async (): Promise<CheckBillingResponse> => {
  const defaultResponse = {
    addressLine1: 'no aplicable',
    locality: 'no aplicable',
    postalCode: '0000',
    country: 'VE',
  };

  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Billing,
    };

    const { data } = await graphql<AddressResponse>(
      GetAddressByIdAndType,
      body
    );
    const isDataAnArray =
      data?.addresses && Array.isArray(data.addresses?.data);
    const isDataValid = data?.addresses?.data.length;

    if (!data.addresses || (isDataAnArray && !isDataValid)) {
      return defaultResponse;
    }

    const { address } = data?.addresses?.data[0]?.attributes;

    return {
      addressLine1: address.address || defaultResponse.addressLine1,
      locality: address.city || defaultResponse.locality,
      postalCode: address.zipCode || defaultResponse.postalCode,
      country: address.country || defaultResponse.country,
    };
  } catch (error) {
    console.log('error checking billing: ', error);
    return defaultResponse;
  }
};

const sendInvoiceEmail = async (products: any[], payment: any) => {
  try {
    let emailContent = '';
    // TODO! improve types
    const productItems: any[] = [];
    const created = new Date(payment.createdAt).toLocaleDateString();
    const amountPayed = `$${Number(payment.amountMoney.amount) / 100} USD`;
    const sendReceiptEmail = httpsCallable<string, SendEmailFn>(
      'sendReceiptEmail'
    );
    const sendMerchantEmail = httpsCallable<string, SendEmailFn>(
      'sendMerchantEmail'
    );

    products.forEach((item) => {
      const productFinded = state.productMail.find(
        (mailProduct) => mailProduct.id == item.id
      );

      if (productFinded) {
        productItems.push({
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

        // if (emailContent) {
        //   emailContent = emailTemplate({
        //     name: productFinded.name,
        //     price: item.price,
        //     quantity: item.quantity,
        //   });
        // } else {
        //   emailContent += emailTemplate({
        //     name: productFinded.name,
        //     price: item.price,
        //     quantity: item.quantity,
        //   });
        // }
      }
    });

    const merchant = {
      payed: amountPayed,
      email: auth.user.email,
      phone: checkout.phone,
      shipping: checkout.fullAddress,
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: payment.orderId,
    };

    const receipt = {
      payed: amountPayed,
      // email: 'novanet@mailinator.com', // payment.buyerEmailAddress,
      email: payment.buyerEmailAddress,
      nameCustomer: payment.note,
      date: created,
      content: emailContent,
      order_id: payment.orderId,
    };

    await Promise.all([sendReceiptEmail(receipt), sendMerchantEmail(merchant)]);

    $notify({
      group: 'all',
      title: 'Recibo - Test',
      text: '¡Gracias por preferirnos!',
    });

    setTimeout(() => {
      cart.clearCartItems();
      state?.card?.destroy();
      router.push('/invoices');
    }, 1000);
  } catch (err) {
    console.log('sendInvoiceEmail Error: ', err);
    $notify({
      group: 'all',
      title: 'Error',
      text: '¡Hubo un error al enviar el email!',
    });
  }
};

const createInvoice = async (payment: any, products: any[]) => {
  const productName = state.productsCart;
  const filterProducts: any[] = [];

  products.forEach((product) => {
    const find = productName.find((item) => item.id === product.id);

    if (find) {
      filterProducts.push({
        id_product: +product.id,
        quantity: Number(product.quantity),
        name_product: find.name,
      });
    }
  });

  payment.shippingAddress.phone = checkout.phone;
  payment.shippingAddress.home = checkout.home;

  const paymentInfo = {
    name: checkout.name,
    lastname: checkout.lastName,
    email: payment.buyerEmailAddress,
    confirmation: payment.id,
    amount: payment.totalMoney.amount / 100,
    payment_date: new Date(),
  };

  const body = {
    amount: payment.totalMoney.amount / 100,
    order_id: payment.orderId,
    paid: true,
    payment_id: payment.id,
    products: filterProducts,
    user_id: +auth.user.id,
    shippingAddress: payment.shippingAddress,
    fullName: payment.note,
    cardType: payment.cardDetails.card.cardBrand,
    cardKind: payment.cardDetails.card.cardType,
    cardLast: payment.cardDetails.card.last4,
    payment_info: [paymentInfo],
    payment_method: 'squareup',
  };

  const data = await graphql<CreateInvoiceResponse>(CreateInvoice, {
    invoice: body,
  });

  return data;
};

const createPayment = async (paymentBody: any) => {
  const generatePayment = httpsCallable<string, GeneratePayment>('payment');
  const { data } = await generatePayment(paymentBody);

  if (data.status !== 'COMPLETED') {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'El pago no fué realizado',
    });
    state.isLoading = false;
    return;
  }

  $notify({
    group: 'all',
    title: 'Éxito',
    text: 'El pago se ha realizado con éxito',
  });

  const invoiceItems = cart.cartItems;
  const response = await createInvoice(data, invoiceItems);

  if (!response?.data?.createInvoice?.data?.id) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un problema al generar la factura',
    });
    state.isLoading = false;
    return;
  }

  $notify({
    group: 'all',
    title: 'Éxito',
    text: 'Su recibo fué creado, puede revisarlo en sus ordenes',
  });

  sendInvoiceEmail(invoiceItems, data);
};

const makePayment = async (tokenResult: Square.TokenResult) => {
  try {
    state.isLoading = true;
    state.cardButtonDisabled = true;

    const idempotencyKey = crypto.randomUUID();

    if (tokenResult.status !== 'OK') {
      $notify({
        group: 'all',
        title: 'Error',
        text: 'Hubo un problema al iniciar proceso de compra, intente de nuevo',
      });
      return;
    }

    const payment = {
      idempotencyKey,
      locationId: SQUARE_LOCATION_ID,
      sourceId: tokenResult.token,
      customerId: auth.user?.customerId ?? '',
      amountMoney: {
        amount: cart.amount * 100,
        currency: 'USD',
      },
      buyerEmailAddress: auth.user.email,
      shippingAddress: {
        addressLine1: `${checkout.address}`,
        home: checkout.home,
        locality: checkout.city,
        postalCode: checkout.zipCode,
        country: 'VE',
        phone: checkout.phone,
      },
      billingAddress: {},
      note: checkout.fullName,
    };

    const billing = await checkBilling();
    payment.billingAddress = billing;
    await createPayment(payment);
  } catch (err) {
    console.log(err);
  } finally {
    state.isLoading = false;
    state.cardButtonDisabled = false;
  }
};

const getProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);
  const hasCartProducts = product.cartProducts?.length;

  if (!itemsId.length || !cart.cartItems.length) return;

  if (!hasCartProducts) {
    // fill from server
  }

  state.productMail = product.cartProducts as ProductsMapped[];
  state.productsCart = product.cartProducts as ProductsMapped[];

  // const productPromises = itemsId.map((id: string) =>
  //   graphql<ProductsResponse>(GetProductById, { id })
  // );

  // const response = await Promise.all(productPromises);
  // let products: Product[] = [];

  // response.forEach((res) => {
  //   products = res.data.products.data;
  // });

  // state.productMail = products;
  // state.productsCart = products;
};

const loadSquareCard = async () => {
  try {
    isLoadingCard.value = true;
    const payments = Square.payments(SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID);

    const card = await payments.card();
    await card.attach('#card-container');

    // @ts-ignore
    btnRef.value.$ref.addEventListener('click', async () => {
      const tokenResult = await card.tokenize();
      makePayment(tokenResult);
    });
  } catch (error) {
    console.error('error: ', { error });
  } finally {
    isLoadingCard.value = false;
  }
};

onMounted(async () => {
  await getProducts();
  await loadSquareCard();
});
</script>
