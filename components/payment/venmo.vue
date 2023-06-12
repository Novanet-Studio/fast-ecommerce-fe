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
          :error="status.name.isError"
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
          :error="status.lastName.isError"
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
          :error="status.date.isError"
          :error-message="status.date.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Monto del pago en USD<sup class="form__required">*</sup></label
        >
        <app-input
          v-model.number="formData.amountPayed"
          :error="status.amountPayed.isError"
          :error-message="status.amountPayed.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Payment ID<sup class="form__required">*</sup></label
        >
        <app-input
          v-model.number="formData.confirmation"
          :error="status.confirmation.isError"
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

const { $notify } = useNuxtApp();

const cart = useCartStore();
const product = useProductStore();
const invoice = useInvoiceStore();

const sending = ref<boolean>(false);
const productsCart = ref<Product[]>([]);
const productsMail = ref<Product[]>([]);

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

    const paymentData: PaymentObject = {
      orderId: crypto.randomUUID(),
      name: formData.name,
      lastname: formData.lastName,
      confirmation: formData.confirmation,
      amount: formData.amountPayed,
      paymentDate: formData.date,
    };

    const invoiceItems = cart.cartItems;
    await invoice.createInvoiceReport(paymentData, invoiceItems, 'venmo');

    $notify({
      group: 'all',
      title: 'Éxito',
      text: 'La orden se ha generado, se encuentra pendiente en aprobación',
    });

    await invoice.sendEmail(invoiceItems, paymentData);
  } catch (error) {
    console.log('Was an error while sending payment report');
  } finally {
    sending.value = false;
  }
});

const getProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);
  const hasCartProducts = product.cartProducts?.length;

  if (!itemsId.length || !cart.cartItems.length) return;

  if (!hasCartProducts) {
    // fill from server
  }

  productsMail.value = product.cartProducts as Product[];
  productsCart.value = product.cartProducts as Product[];
};

onMounted(() => {
  getProducts();
});
</script>
