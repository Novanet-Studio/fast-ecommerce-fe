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
          >Nombre del usuario<sup class="form__required">*</sup></label
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
          >Apellido del usuario<sup class="form__required">*</sup></label
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
          v-model.number="formData.amountPayed"
          :is-error="status.amountPayed.isError"
          :error-message="status.amountPayed.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Payment ID<sup class="form__required">*</sup></label
        >
        <app-input
          v-model.number="formData.confirmation"
          :is-error="status.confirmation.isError"
          :error-message="status.confirmation.message"
        />
      </div>
      <p>
        Al realizar esta compra usted acepta
        <a href="#" class="text-color-2">nuestros términos y condiciones</a>.
      </p>
      <div class="form__btn-group mt-4">
        <app-button
          type="submit"
          @click="submit"
          :disabled="isError || !verify()"
        >
          Enviar
        </app-button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { CreateInvoice } from '~/graphql/mutations';

const { $store, $notify, $httpsCallable } = useNuxtApp();
const router = useRouter();
const graphql = useStrapiGraphQL();

const cart = useCartStore();
const auth = useAuthStore();
const checkout = useCheckoutStore();
const product = useProductStore();

const sending = ref<boolean>(false);
const productsCart = ref<Product[]>([]);
const productsMail = ref<Product[]>([]);

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
    confirmacion: payment.confirmacion,
    email: checkout.email,
  };

  delete paymentInfo.orderId;

  const data = {
    amount: cart.amount,
    order_id: payment.orderId,
    paid: false,
    payment_id: payment.confirmacion,
    products: filterProducts,
    user_id: +auth.user.id,
    shippingAddress: addressData,
    fullName: checkout.fullName,
    cardType: 'no aplica',
    cardKind: 'no aplica',
    cardLast: 'no aplica',
    payment_info: [paymentInfo],
    payment_method: 'venmo',
  };

  const result = await graphql<CreateInvoiceRequest>(CreateInvoice, {
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
      nombre: formData.name,
      apellido: formData.lastName,
      confirmacion: formData.confirmation.toString(),
      monto: formData.amountPayed,
      fecha_pago: formData.date,
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
    const created = new Date(payment.fecha_pago).toLocaleDateString();
    const amountPayed = `$${Number(payment.monto)} USD`;
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
      cart.clear();
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

  productsMail.value = product.cartProducts as Product[];
  productsCart.value = product.cartProducts as Product[];

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
