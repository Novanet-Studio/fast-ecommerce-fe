<script lang="ts" setup>
import { GetAddressByIdAndType } from '~/graphql/queries';
import type { Payment } from 'square';

interface State {
  card: Square.Card | null;
}

interface CheckBillingResponse {
  addressLine1: string;
  locality: string;
  postalCode: string;
  country: string;
}

const { $notify } = useNuxtApp();
const { square } = useRuntimeConfig().public;

const graphql = useStrapiGraphQL();
const auth = useAuthStore();
const cart = useCartStore();
const checkout = useCheckoutStore();
const invoice = useInvoiceStore();

const state = reactive<State & Record<any, any>>({
  card: null,
  isLoading: false,
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

    const { data } = await graphql<any>(GetAddressByIdAndType, body);
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

const createPayment = async (paymentBody: any) => {
  const { data } = await useFetch('/api/payment', {
    method: 'post',
    body: paymentBody,
  });

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
  const response = await invoice.createVisaInvoice(data, invoiceItems);

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

  await invoice.sendVisaEmail(invoiceItems, data);
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
      locationId: square.locationId,
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

const loadSquareCard = async () => {
  try {
    isLoadingCard.value = true;
    const payments = Square.payments(square.applicationId, square.locationId);

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
  await loadSquareCard();
});
</script>

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
          :loading="state.isLoading"
          :disabled="state.cardButtonDisabled"
          ref="btnRef"
        >
          Pagar
        </app-button>
      </div>
    </form>
    <div id="payment-status-container"></div>
  </div>
</template>

<style scoped>
.visa__terms-wrapper {
  @apply text-dark-200;
}

.visa__text {
  @apply text-sm mb-8;
}

.visa__link {
  @apply text-color-2;
}
</style>
