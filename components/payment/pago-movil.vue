<script lang="ts" setup>
const { amountRate, bcvUsd } = await useGetBcvUsd();

const { isSending, hasError, submit } = usePaymentForm({
  equalAmountTo: amountRate.value.toString(),
  method: 'pago_movil',
  payment: {
    validation: (data) =>
      Date.parse(data.date) > Date.parse(new Date().toISOString()),
    message: `El monto del pago debe ser de ${amountRate.value} y la fecha debe concordar con el dia de hoy!`
  }
});
</script>

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
        <app-input name="name" placeholder="john" />
      </div>
      <div class="form__group">
        <label class="form__label">Apellido del titular de cuenta<sup class="form__required">*</sup></label>
        <app-input name="lastName" placeholder="doe" />
      </div>
      <div class="form__group">
        <label class="form__label">Fecha<sup class="form__required">*</sup></label>
        <app-input name="date" type="date" />
      </div>
      <div class="form__group">
        <label class="form__label">Monto en Bs<sup class="form__required">*</sup></label>
        <p>
          <b>La tasa del día BCV es de {{ bcvUsd }} BsD. El monto del pago debe
            ser de {{ amountRate }}</b>
        </p>
        <app-input name="amountPayed" />
      </div>
      <div class="form__group">
        <label class="form__label">Numero de confirmacion<sup class="form__required">*</sup></label>
        <app-input name="confirmation" />
      </div>
      <p>
        Al realizar esta compra usted acepta
        <a href="#" class="text-color-2">nuestros términos y condiciones</a>.
      </p>
      <div class="form__btn-group mt-4">
        <app-button type="submit" @click="submit" :disabled="hasError">
          Enviar
        </app-button>
      </div>
    </form>
  </section>
</template>
