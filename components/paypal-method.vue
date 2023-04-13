<template>
  <div ref="paypalRef" id="paypal-container"></div>
</template>

<script lang="ts" setup>
import {
  loadScript,
  type OrderResponseBody,
  type PayPalNamespace,
} from '@paypal/paypal-js';
import { getProductById as GetProductById } from '~/graphql';

type GeneratePayment = (data: any) => Promise<{ data: any }>;
type SendEmailFn = (data: any) => Promise<{ message: string; status: number }>;

const { $store, $notify, $httpsCallable } = useNuxtApp();

const { PAYPAL_CLIENT_ID } = useRuntimeConfig().public;

const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = $store.auth();
const cart = $store.cart();
const product = $store.product();
const checkout = $store.checkout();
const invoice = $store.invoice();
const paypalRef = ref();
// const paypal = ref();
const productsMail = ref<ProductsMapped[]>();

const httpsCallable = $httpsCallable as <T, U>(data: T) => U;

const sendInvoiceEmail = async (
  order: OrderResponseBody,
  items: CartItem[]
) => {
  try {
    let emailContent = '';
    const productItems = [];
    const sendReceiptEmail = httpsCallable<string, SendEmailFn>(
      'sendReceiptEmail'
    );
    const sendMerchantEmail = httpsCallable<string, SendEmailFn>(
      'sendMerchantEmail'
    );
    const created = new Date(order.create_time).toLocaleDateString();
    const amountPayed = `$${order.purchase_units[0].amount.value.toString()} USD`;

    items.forEach((item) => {
      const productFound = productsMail.value!.find(
        (product: ProductsMapped) => product.id === item.id
      );

      if (productFound) {
        productItems.push({
          quantity: item.quantity,
          name: productFound.name,
          amount: item.price,
          description: productFound.description,
        });

        emailContent += emailTemplate({
          name: productFound.name,
          price: item.price,
          quantity: item.quantity,
        });
      }
    });

    const merchant = {
      payed: amountPayed,
      email: auth.user.email,
      phone: checkout.phone,
      shipping: checkout.shippingAddress,
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: order.id,
    };

    console.log({ order });

    const receipt = {
      payed: amountPayed,
      email: 'novanet@mailinator.com', // payment.buyerEmailAddress,
      // email: order.purchase_units[0],
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: order.id,
    };

    await Promise.all([sendReceiptEmail(receipt), sendMerchantEmail(merchant)]);

    $notify({
      group: 'all',
      title: 'Orden de compra generada',
      text: '¡Gracias por preferirnos!',
    });
    cart.clearCartItems();
    router.push({
      path: '/',
      replace: true,
    });
  } catch (error) {
    $notify({
      group: 'all',
      title: '¡Error!',
      text: 'Hubo un error al enviar el correo',
    });
    console.log('sendInvoiceEmail Error: ', error);
  }
};

// const getProducts = async () => {
//   const itemsId = cart.cartItems.map((item) => item.id);

//   if (!itemsId.length || !cart.cartItems.length) return;

//   const productPromises = itemsId.map((id: string) =>
//     graphql<ProductsResponse>(GetProductById, { id })
//   );

//   const response = await Promise.all(productPromises);

//   let products: Product[] = [];

//   response.forEach((res) => {
//     products = res.data.products.data;
//   });

//   productsMail.value = products;
// };

const getProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);
  const hasCartProducts = product.cartProducts?.length;

  if (!itemsId.length || !cart.cartItems.length) return;

  if (hasCartProducts) {
    // TODO! fetch products from server
    // const productPromises = itemsId.map((id: string) =>
    //   graphql<ProductsResponse>(GetProductById, { id })
    // );
    // const response = await Promise.all(productPromises);
    // let products: Product[] = [];
    // response.forEach((res) => {
    //   products = res.data.products.data;
    // });
    // productsMail.value = products;
  }

  productsMail.value = product.cartProducts as ProductsMapped[];
};

// const loadPaypal = async () => {
//   let $paypal: PayPalNamespace;
//   try {
//     await loadScript({
//       'client-id': PAYPAL_CLIENT_ID,
//       currency: 'USD',
//       'data-namespace': '$paypal',
//       'disable-funding': 'credit,card',
//     });

//     paypal.value = window.paypal as PayPalNamespace;
//     $paypal = window.paypal as PayPalNamespace;

//   } catch (error) {
//     console.log(error);
//   }

//   try {
//     // await (paypal.value as PayPalNamespace)
//     //   .Buttons({
//     //     createOrder: (_, actions) =>
//     //       actions.order.create({
//     //         purchase_units: [
//     //           {
//     //             description: 'Compra desde la app',
//     //             amount: {
//     //               currency_code: 'USD',
//     //               value: cart.amount.toString(),
//     //             },
//     //             shipping: {
//     //               address: {
//     //                 address_line_1: checkout.address,
//     //                 admin_area_1: checkout.home,
//     //                 admin_area_2: checkout.city,
//     //                 country_code: 'VE',
//     //                 postal_code: checkout.zipCode,
//     //               },
//     //               options: [],
//     //             },
//     //             invoice_id: crypto.randomUUID(),
//     //           },
//     //         ],
//     //       }),
//     //     onApprove: async (_, actions) => {
//     //       try {
//     //         const result = await actions.order?.capture();
//     //         const container = document.getElementById('paypal-container');
//     //         container!.innerHTML = '';
//     //         container!.innerHTML = `<h4 class="text-center">Por favor, espere</h4>`;

//     //         if (result?.status !== 'COMPLETED') {
//     //           $notify({
//     //             group: 'all',
//     //             title: 'Un error ha ocurrido',
//     //             text: 'Hubo un error al aprovar el pago',
//     //           });
//     //           return;
//     //         }

//     //         const { cartItems } = cart;
//     //         $notify({
//     //           group: 'all',
//     //           title: '¡Proceso exitoso!',
//     //           text: 'El pago se ha realizado con éxito',
//     //         });

//     //         await invoice.createInvoice(result, cartItems);
//     //         $notify({
//     //           group: 'all',
//     //           title: 'Recibo creado',
//     //           text: 'Se encuentra disponible en sus ordenes',
//     //         });

//     //         await sendInvoiceEmail(result, cartItems);
//     //       } catch (error) {
//     //         $notify({
//     //           group: 'all',
//     //           title: 'Pagos paypal',
//     //           text: `Hubo un error al procesar el pago!`,
//     //         });
//     //       }
//     //     },
//     //     onError: () =>
//     //       $notify({
//     //         group: 'all',
//     //         title: 'Pagos paypal',
//     //         text: `Hubo un error, no se puede procesar el pago en estos momentos!`,
//     //       }),
//     //   })
//     //   .render('#paypal-container');

//     console.log({ $paypal });

//     await $paypal!.Buttons({
//         createOrder: (_, actions) =>
//           actions.order.create({
//             purchase_units: [
//               {
//                 description: 'Compra desde la app',
//                 amount: {
//                   currency_code: 'USD',
//                   value: cart.amount.toString(),
//                 },
//                 shipping: {
//                   address: {
//                     address_line_1: checkout.address,
//                     admin_area_1: checkout.home,
//                     admin_area_2: checkout.city,
//                     country_code: 'VE',
//                     postal_code: checkout.zipCode,
//                   },
//                   options: [],
//                 },
//                 invoice_id: crypto.randomUUID(),
//               },
//             ],
//           }),
//         onApprove: async (_, actions) => {
//           try {
//             const result = await actions.order?.capture();
//             const container = document.getElementById('paypal-container');
//             container!.innerHTML = '';
//             container!.innerHTML = `<h4 class="text-center">Por favor, espere</h4>`;

//             if (result?.status !== 'COMPLETED') {
//               $notify({
//                 group: 'all',
//                 title: 'Un error ha ocurrido',
//                 text: 'Hubo un error al aprovar el pago',
//               });
//               return;
//             }

//             const { cartItems } = cart;
//             $notify({
//               group: 'all',
//               title: '¡Proceso exitoso!',
//               text: 'El pago se ha realizado con éxito',
//             });

//             await invoice.createInvoice(result, cartItems);
//             $notify({
//               group: 'all',
//               title: 'Recibo creado',
//               text: 'Se encuentra disponible en sus ordenes',
//             });

//             await sendInvoiceEmail(result, cartItems);
//           } catch (error) {
//             $notify({
//               group: 'all',
//               title: 'Pagos paypal',
//               text: `Hubo un error al procesar el pago!`,
//             });
//           }
//         },
//         onError: () =>
//           $notify({
//             group: 'all',
//             title: 'Pagos paypal',
//             text: `Hubo un error, no se puede procesar el pago en estos momentos!`,
//           }),
//       })
//       .render('#paypal-container');
//   } catch (error) {
//     console.log('An error occurred when trying render button: ', error);
//   }
// };

const loadPaypal = async () => {
  try {
    const $paypal = await loadScript({
      'client-id': PAYPAL_CLIENT_ID,
      currency: 'USD',
      'data-namespace': '$paypal',
      'disable-funding': 'credit,card',
    });

    await $paypal
      .Buttons({
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

            const items = cartItems.map((item) => ({
              quantity: item.quantity,
              id_product: Number(
                product.cartProducts?.find((prod) => prod.id === item.id)?.id
              ),
              name_product: product.cartProducts?.find(
                (prod) => prod.id === item.id
              )?.name,
            }));

            await invoice.createInvoice(result, items);
            $notify({
              group: 'all',
              title: 'Recibo creado',
              text: 'Se encuentra disponible en sus ordenes',
            });

            await sendInvoiceEmail(result, cartItems);
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
      .render('#paypal-container');
  } catch (error) {
    console.log('An error occurred when trying render button: ', error);
  }
};

onMounted(async () => {
  await loadPaypal();
  await getProducts();
});
</script>
