<template>
  <section>
    <template v-show="false">
      <div>
        <figure>
          <p>Nombre:</p>
          <p>Numero de telefono:</p>
          <p>Banco:</p>
          <p>RIF:</p>
          <p>Motivo:</p>
        </figure>
        <figure>
          <figcaption>
            <strong>Subtotal en Bs</strong>
            <small>24.40</small>
          </figcaption>
        </figure>
      </div>
      <div>
        <strong>No disponemos de este metodo actualmente, por favor, seleccione
          otro.</strong>
      </div>
    </template>
    <form @submit.prevent="submit">
      <div class="form__group">
        <label class="form__label">Nombre del titular de cuenta<sup class="form__required">*</sup></label>
        <app-input v-model="formData.name" placeholder="john" :error="status.name.isError"
          :error-message="status.name.message" />
      </div>
      <div class="form__group">
        <label class="form__label">Apellido del titular de cuenta<sup class="form__required">*</sup></label>
        <app-input v-model="formData.lastName" placeholder="doe" :error="status.lastName.isError"
          :error-message="status.lastName.message" />
      </div>
      <div class="form__group">
        <label class="form__label">Fecha<sup class="form__required">*</sup></label>
        <app-input v-model="formData.date" type="date" :error="status.date.isError"
          :error-message="status.date.message" />
      </div>
      <div class="form__group">
        <label class="form__label">Monto en Bs<sup class="form__required">*</sup></label>
        <p>
          <b>La tasa del día BCV es de {{ bcvUsd }} BsD. El monto del pago debe
            ser de {{ amountRate }}</b>
        </p>
        <app-input v-model="formData.amountPayed" :error="status.amountPayed.isError"
          :error-message="status.amountPayed.message" />
      </div>
      <div class="form__group">
        <label class="form__label">Numero de confirmacion<sup class="form__required">*</sup></label>
        <app-input v-model="formData.confirmation" :error="status.confirmation.isError"
          :error-message="status.confirmation.message" />
      </div>
      <p>
        Al realizar esta compra usted acepta
        <a href="#" class="text-color-2">nuestros términos y condiciones</a>.
      </p>
      <div class="form__btn-group mt-4">
        <app-button type="submit" @click="submit" :disabled="isError || !verify()">
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
const { amountRate, bcvUsd } = await useGetBcvUsd();

const cart = useCartStore();
const invoice = useInvoiceStore();

const sending = ref<boolean>(false);

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
          'La cantidad no es igual al monto especificado',
          (value) => {
            return value === amountRate.value.toString();
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
        text: `El monto del pago debe ser de ${amountRate.value} y la fecha debe concordar con el dia de hoy!`,
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
      amountRate: amountRate.value,
    };

    const invoiceItems = cart.cartItems;
    await invoice.createInvoiceReport(paymentData, invoiceItems, 'pago_movil');

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
</script>
