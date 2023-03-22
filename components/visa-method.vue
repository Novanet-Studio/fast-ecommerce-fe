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
  card: Square.Card;
  productMail: Product[];
  productsCart: Product[];
}

const { $store, $notify, $httpsCallable } = useNuxtApp();
const { SQUARE_APPLICATION_ID, SQUARE_LOCATION_ID } = useRuntimeConfig().public;

const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = $store.auth();
const cart = $store.cart();
const checkout = $store.checkout();

const state = reactive<State & Record<any, any>>({
  card: null,
  isLoading: false,
  summary: '',
  productMail: null,
  productHtml: null,
  productsCart: null,
  cardButtonDisabled: false,
});

const isLoadingCard = ref(false);
const btnRef = ref(null);

const checkBilling = async () => {
  try {
    const body = {
      id: +auth.user.id,
      type: AddressType.Billing,
    };

    const defaultResponse = {
      addressLine1: 'no aplicable',
      locality: 'no aplicable',
      postalCode: '0000',
      country: 'VE',
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

    const { address } = data?.addresses?.data[0].attributes;

    return {
      addressLine1: address.address,
      locality: address.city,
      postalCode: address.zipCode,
      country: address.country,
    };
  } catch (error) {
    console.log(error);
  }
};

const sendInvoiceEmail = async (products: any[], payment: any) => {
  try {
    let emailContent = '';
    const productItems = [];
    const created = new Date(payment.createdAt).toLocaleDateString();
    const amountPayed = `$${Number(payment.amountMoney.amount) / 100} USD`;
    const sendReceiptEmail = $httpsCallable('sendReceiptEmail');
    const sendMerchantEmail = $httpsCallable('sendMerchantEmail');

    products.forEach((item) => {
      const productFinded = state.productMail.find(
        (mailProduct) => mailProduct.id == item.id
      );

      if (productFinded) {
        productItems.push({
          quantity: item.quantity,
          name: productFinded.attributes.name,
          amount: item.price,
          description: productFinded.attributes.description,
        });

        if (emailContent) {
          emailContent = emailTemplate({
            name: productFinded.attributes.name,
            price: item.price,
            quantity: item.quantity,
          });
        } else {
          emailContent += emailTemplate({
            name: productFinded.attributes.name,
            price: item.price,
            quantity: item.quantity,
          });
        }
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
      email: 'novanet@mailinator.com', // payment.buyerEmailAddress,
      nameCustomer: payment.note,
      date: created,
      content: emailContent,
      order_id: payment.orderId,
    };

    console.log('merchant: ', merchant);
    console.log('receipt: ', receipt);

    // const response = (await sendReceiptEmail(receipt)) as unknown as {
    //   message: string;
    //   status: number;
    // };

    // if (response.status === 200) {
    //   console.log('merchant: ', merchant);
    //   await sendMerchantEmail(merchant);
    // }

    $notify({
      group: 'all',
      title: 'Recibo - Test',
      text: '¡Gracias por preferirnos!',
    });

    cart.clearCartItems();
    state?.card?.destroy();
    router.push('/');
  } catch (err) {
    console.log('sendInvoiceEmail Error: ', err);
    // $notify({
    //   group: 'all',
    //   title: 'Recibo - Test',
    //   text: '¡Gracias por preferirnos!',
    // });
    // cart.clearCartItems();
    // state.card.destroy();
    // router.push('/');
  }
};

const createInvoice = async (payment: any, products: any[]) => {
  const productName = state.productsCart;
  const filterProducts = [];

  products.forEach((product) => {
    const find = productName.find((item) => item.id === product.id);

    if (find) {
      filterProducts.push({
        id_product: +product.id,
        quantity: Number(product.quantity),
        name_product: find.attributes.name,
      });
    }
  });

  payment.shippingAddress.phone = checkout.phone;
  payment.shippingAddress.home = checkout.home;

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
  };

  const data = await graphql<Invoice>(CreateInvoice, { invoice: body });

  return data;
};

const createPayment = async (paymentBody: any) => {
  const generatePayment = $httpsCallable('payment');
  const { data } = (await generatePayment(paymentBody)) as { data: Payment };

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
  // TODO: typings improvement
  // const {
  //   createInvoice: { data: invoiceResult },
  // } = await createInvoice(data, invoiceItems);
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

  if (!itemsId.length || !cart.cartItems.length) return;

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductsResponse>(GetProductById, { id })
  );

  const response = await Promise.all(productPromises);
  let products: Product[] = [];

  response.forEach((res) => {
    products = res.data.products.data;
  });

  state.productMail = products;
  state.productsCart = products;
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
