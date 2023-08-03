<script lang="ts" setup>
const cart = useCartStore();
const { isSending, hasError, submit } = usePaymentForm({
  equalAmountTo: cart.amount.toString(),
  method: 'zelle',
  payment: {
    validation: (form) =>
      Date.parse(form.date) > Date.parse(new Date().toISOString()),
    message: `El monto del pago no es valido o la fecha no concuerda con el dia de hoy`
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
        <strong>No disponemos de este metodo actualmente, por favor, seleccione
          otro.</strong>
      </div>
    </template>
    <form @submit.prevent="submit">
      <div class="form__group">
        <label class="form__label">Nombre del usuario<sup class="form__required">*</sup></label>
        <app-input name="name" placeholder="john" />
      </div>
      <div class="form__group">
        <label class="form__label">Apellido del usuario<sup class="form__required">*</sup></label>
        <app-input name="lastName" placeholder="doe" />
      </div>
      <div class="form__group">
        <label class="form__label">Fecha del pago<sup class="form__required">*</sup></label>
        <app-input name="date" type="date" />
      </div>
      <div class="form__group">
        <label class="form__label">Monto del pago en USD<sup class="form__required">*</sup></label>
        <app-input name="amountPayed" />
      </div>
      <div class="form__group">
        <label class="form__label">Payment ID<sup class="form__required">*</sup></label>
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
