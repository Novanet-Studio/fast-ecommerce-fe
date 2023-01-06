<template>
  <div ref="paypalRef" id="paypal-container"></div>
</template>

<script lang="ts" setup>
import {
  loadScript,
  type OrderResponseBody,
  type PayPalNamespace,
} from '@paypal/paypal-js';
import {
  createInvoice as CreateInvoice,
  getProductById as GetProductById,
} from '~/graphql';
const { $store, $notify, $httpsCallable } = useNuxtApp();

const { PAYPAL_CLIENT_ID } = useRuntimeConfig().public;

const router = useRouter();
const graphql = useStrapiGraphQL();
const auth = $store.auth();
const cart = $store.cart();
const checkout = $store.checkout();
const paypalRef = ref();
const paypal = ref();
const productsMail = ref<Product[]>();

type CartItem = {
  id: string;
  quantity: number;
  price: number;
};

const createInvoice = async (order: OrderResponseBody, items: CartItem[]) => {
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
    nombre: order.payer.name?.given_name,
    apellido: order.payer.name?.surname,
    email: order.payer.email_address,
    confirmacion: order.id,
    monto: order.purchase_units[0].amount.value,
    fecha_pago: order.create_time,
  };

  const body = {
    amount: order.purchase_units[0].amount.value,
    order_id: order.purchase_units[0].invoice_id,
    paid: true,
    payment_id: order.id,
    products: items,
    user_id: auth.user.id,
    shippingAddress: address,
    fullName: checkout.fullName,
    cardType: 'no aplica',
    cardKind: 'no aplica',
    cardLast: 'no aplica',
    payment_info: [paymentInfo],
    payment_method: 'paypal',
  };

  const { data } = await graphql<Invoice>(CreateInvoice, {
    invoice: body,
  });

  return data;
};

const sendInvoiceEmail = async (
  order: OrderResponseBody,
  items: CartItem[]
) => {
  try {
    let emailContent = '';
    const productItems = [];
    const sendReceiptEmail = $httpsCallable('sendReceiptEmail');
    const sendMerchantEmail = $httpsCallable('sendMerchantEmail');
    const created = new Date(order.create_time).toLocaleDateString();
    const amountPayed = `$${order.purchase_units[0].amount.value.toString()} USD`;

    items.forEach((item) => {
      const finded = productsMail.value!.find(
        (product: Product) => product.id === item.id
      ) as Product;

      if (!finded) return;

      productItems.push({
        quantity: item.quantity,
        name: finded.attributes.name,
        amount: item.price,
        description: finded.attributes.description,
      });

      if (emailContent) {
        emailContent = emailTemplate({
          name: finded.attributes.name,
          price: item.price,
          quantity: item.quantity,
        });
      } else {
        emailContent += emailTemplate({
          name: finded.attributes.name,
          price: item.price,
          quantity: item.quantity,
        });
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
      order_id: order.id,
    };

    const receipt = {
      payed: amountPayed,
      email: 'novanet@mailinator.com', // payment.buyerEmailAddress,
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: order.id,
    };

    const response = (await sendReceiptEmail(receipt)) as unknown as {
      message: string;
      status: number;
    };

    response.status === 200 && (await sendMerchantEmail(merchant));

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

  productsMail.value = products;
};

const loadPaypal = async () => {
  try {
    await loadScript({
      'client-id': PAYPAL_CLIENT_ID,
      currency: 'USD',
      'data-namespace': '$paypal',
      'disable-funding': 'credit,card',
    });

    paypal.value = window.$paypal as PayPalNamespace;
  } catch (error) {
    console.log(error);
  }

  try {
    await (paypal.value as PayPalNamespace)
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
                  options: [],
                },
                invoice_id: crypto.randomUUID(),
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

            await createInvoice(result, cartItems);
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
