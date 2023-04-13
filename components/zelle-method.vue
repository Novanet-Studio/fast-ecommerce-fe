<template>
  <section>
    <template v-show="false">
      <div>
        <figure>
          <p>Nombre:</p>
          <p>Numero de telefono:</p>
          <p>Correo:</p>
          <p>Motivo:</p>
        </figure>
        <figure>
          <figcaption>
            <strong>Subtotal</strong>
            <small>$ 24.40</small>
          </figcaption>
        </figure>
      </div>
      <div>
        <strong
          >No disponemos de este metodo actualmente, por favor, seleccione
          otro.</strong
        >
      </div>
    </template>
    <form @submit.prevent="submit">
      <div class="form__group">
        <label class="form__label"
          >Nombre del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input
          v-model="formData.name"
          placeholder="john"
          :is-error="status.name.isError"
          :error-message="status.name.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Apellido del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input
          v-model="formData.lastName"
          placeholder="doe"
          :is-error="status.lastName.isError"
          :error-message="status.lastName.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Fecha del pago<sup class="form__required">*</sup></label
        >
        <app-input
          v-model="formData.date"
          type="date"
          :is-error="status.date.isError"
          :error-message="status.date.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Monto del pago en USD<sup class="form__required">*</sup></label
        >
        <app-input
          v-model="formData.amountPayed"
          type="number"
          :is-error="status.amountPayed.isError"
          :error-message="status.amountPayed.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Numero de confirmacion<sup class="form__required">*</sup></label
        >
        <app-input
          v-model="formData.confirmation"
          type="number"
          :is-error="status.confirmation.isError"
          :error-message="status.confirmation.message"
        />
      </div>
      <p>
        Al realizar esta compra usted acepta
        <a href="#" class="text-yellow-400">nuestros términos y condiciones</a>.
      </p>
      <div class="form__btn-group">
        <app-button
          btn-type="submit"
          text="Enviar"
          @click="submit"
          :disabled="isError || !verify()"
        />
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { createInvoice as CreateInvoice } from '~/graphql';

const { $store, $notify, $httpsCallable } = useNuxtApp();
const router = useRouter();
const graphql = useStrapiGraphQL();
const cart = $store.cart();
const auth = $store.auth();
const checkout = $store.checkout();
const product = $store.product();
const sending = ref<boolean>(false);
const productsCart = ref<ProductsMapped[]>([]);
const productsMail = ref<ProductsMapped[]>([]);

type SendEmailFn = (data: any) => Promise<{ message: string; status: number }>;
const httpsCallable = $httpsCallable as <T, U>(data: T) => U;

const {
  form: formData,
  status,
  submitter,
  verify,
  isError,
} = useForm({
  form: () => ({
    name: '',
    lastName: '',
    date: '',
    amountPayed: '',
    confirmation: '',
  }),
  rule: {
    name: yupFieldRule(yup.string().required('El campo es obligatorio')),
    lastName: yupFieldRule(yup.string().required('El campo es obligatorio')),
    date: yupFieldRule(yup.string().required('El campo es obligatorio')),
    amountPayed: yupFieldRule(
      yup
        .string()
        .test(
          'must-be-equal',
          'La cantidad debe ser igual al monto total',
          (value) => {
            return value === cart.amount.toString();
          }
        )
        .required('El campo es obligatorio')
    ),
    confirmation: yupFieldRule(
      yup.string().required('El campo es obligatorio')
    ),
  },
  defaultMessage: '',
});

async function createInvoice(payment: any, products: any[]) {
  const productName = productsCart.value;
  const filterProducts: any[] = [];

  products.forEach((product) => {
    const found = productName.find((item) => item.id === product.id);

    if (found) {
      filterProducts.push({
        id_product: +product.id,
        quantity: Number(product.quantity),
        name_product: found.name,
      });
    }
  });

  const addressData = {
    phone: checkout.phone,
    home: checkout.home,
    country: checkout.country,
    locality: checkout.city,
    postalCode: checkout.zipCode,
    addressLine1: checkout.address,
  };

  const paymentInfo = {
    ...payment,
    confirmation: payment.confirmation,
    email: checkout.email,
  };

  delete paymentInfo.orderId;

  const data = {
    amount: payment.amount,
    order_id: payment.orderId,
    paid: false,
    payment_id: payment.confirmation,
    products: filterProducts,
    user_id: +auth.user.id,
    shippingAddress: addressData,
    fullName: checkout.fullName,
    cardType: 'no aplica',
    cardKind: 'no aplica',
    cardLast: 'no aplica',
    payment_info: [paymentInfo],
    payment_method: 'zelle',
  };

  const result = await graphql<CreateInvoiceResponse>(CreateInvoice, {
    invoice: data,
  });

  return result;
}

const { submit } = submitter(async () => {
  if (!verify()) return;

  try {
    sending.value = true;

    if (Date.parse(formData.date) > Date.parse(new Date().toISOString())) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: `El monto del pago no es valido o la fecha no concuerda con el dia de hoy`,
      });
      return;
    }

    const paymentData = {
      orderId: crypto.randomUUID(),
      name: formData.name,
      lastname: formData.lastName,
      confirmation: formData.confirmation.toString(),
      amount: formData.amountPayed,
      payment_date: formData.date,
    };

    const invoiceItems = cart.cartItems;
    await createInvoice(paymentData, invoiceItems);

    $notify({
      group: 'all',
      title: 'Éxito',
      text: 'La orden se ha generado, se encuentra pendiente en aprobación',
    });

    sendInvoiceEmail(invoiceItems, paymentData);
  } catch (error) {
    console.log('Was an error while sending payment report');
  } finally {
    sending.value = false;
  }
});

async function sendInvoiceEmail(products: any[], payment: any) {
  try {
    let emailContent = '';
    // TODO! improve types
    const productItems: any[] = [];
    const created = new Date(payment.date).toLocaleDateString();
    const amountPayed = `$${Number(payment.amount)} USD`;
    const sendReceiptEmail = httpsCallable<string, SendEmailFn>(
      'sendReceiptEmail'
    );
    const sendMerchantEmail = httpsCallable<string, SendEmailFn>(
      'sendMerchantEmail'
    );

    products.forEach((item) => {
      const productFinded = productsMail.value.find(
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
      }
    });

    const orderId = `${payment.orderId} (PENDIENTE EN APROBACION)`;

    const merchant = {
      payed: amountPayed,
      email: auth.user.email,
      phone: checkout.phone,
      shipping: checkout.shippingAddress,
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: orderId,
    };

    const receipt = {
      payed: amountPayed,
      // email: 'novanet@mailinator.com', // payment.buyerEmailAddress,
      email: auth.user.email,
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: orderId,
    };

    await Promise.all([sendReceiptEmail(receipt), sendMerchantEmail(merchant)]);

    $notify({
      group: 'all',
      title: 'Orden de compra generada',
      text: '¡Gracias por preferirnos!',
    });

    setTimeout(() => {
      cart.clearCartItems();
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
}

const getProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);
  const hasCartProducts = product.cartProducts?.length;

  if (!itemsId.length || !cart.cartItems.length) return;

  if (!hasCartProducts) {
    // fill from server
  }

  productsMail.value = product.cartProducts as ProductsMapped[];
  productsCart.value = product.cartProducts as ProductsMapped[];

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

onMounted(() => {
  getProducts();
});
</script>
