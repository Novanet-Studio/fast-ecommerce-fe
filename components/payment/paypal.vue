<script lang="ts" setup>
import { loadScript, type PayPalNamespace } from '@paypal/paypal-js';

const { $notify } = useNuxtApp();
const { PAYPAL_CLIENT_ID } = useRuntimeConfig().public;

const cart = useCartStore();
const checkout = useCheckoutStore();
const invoice = useInvoiceStore();
const paypalRef = ref();

const loadPaypal = async () => {
  try {
    const $paypal = (await loadScript({
      // 'client-id': PAYPAL_CLIENT_ID,
      // 'data-namespace': '$paypal',
      // 'disable-funding': 'credit,card',
      clientId: PAYPAL_CLIENT_ID,
      currency: 'USD',
      dataNamespace: '$paypal',
      disableFunding: 'credit,card',
    })) as PayPalNamespace;

    if ($paypal.Buttons) {
      await $paypal.Buttons({
        createOrder: (_, actions) =>
          actions.order.create({
            purchase_units: [
              {
                description: 'Compra desde la app',
                amount: {
                  currency_code: 'USD',
                  value: cart.amount.toString(),
                },
                shipping: {
                  address: {
                    address_line_1: checkout.address,
                    admin_area_1: checkout.home,
                    admin_area_2: checkout.city,
                    country_code: 'VE',
                    postal_code: checkout.zipCode,
                  },
                  options: [
                    {
                      id: crypto.randomUUID(),
                      label: 'Pago con tarjeta de crédito',
                      selected: true,
                    },
                  ],
                },
                invoice_id: crypto.randomUUID(),
                custom_id: crypto.randomUUID(),
              },
            ],
          }),
        onApprove: async (_, actions) => {
          try {
            const result = await actions.order?.capture();
            const container = document.getElementById('paypal-container');
            container!.innerHTML = '';
            container!.innerHTML = `<h4 class="text-center">Por favor, espere</h4>`;

            if (result?.status !== 'COMPLETED') {
              $notify({
                group: 'all',
                title: 'Un error ha ocurrido',
                text: 'Hubo un error al aprovar el pago',
              });
              return;
            }

            const { cartItems } = cart;
            $notify({
              group: 'all',
              title: '¡Proceso exitoso!',
              text: 'El pago se ha realizado con éxito',
            });

            await invoice.createPaypalInvoice(result, cartItems);
            $notify({
              group: 'all',
              title: 'Recibo creado',
              text: 'Se encuentra disponible en sus ordenes',
            });

            await invoice.sendPaypalEmail(result, cartItems);
          } catch (error) {
            $notify({
              group: 'all',
              title: 'Pagos paypal',
              text: `Hubo un error al procesar el pago!`,
            });
          }
        },
        onError: () =>
          $notify({
            group: 'all',
            title: 'Pagos paypal',
            text: `Hubo un error, no se puede procesar el pago en estos momentos!`,
          }),
      })
        .render(paypalRef.value);
    }

  } catch (error) {
    console.log('An error occurred when trying render button: ', error);
  }
};

onMounted(async () => {
  await loadPaypal();
});
</script>

<template>
  <div ref="paypalRef" id="paypal-container"></div>
</template>
