<template>
  <div class="px-40">
    <div class="w-full py-3 mx-auto lg:max-w-[1230px]">
      <h3 class="title">Envíanos un mensaje</h3>
      <form
        name="contacto"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="submit"
      >
        <div class="form__container">
          <div class="form__left">
            <div class="form__group">
              <label class="form__label">Nombre y Apellido</label>
              <app-input
                v-model="form.fullname"
                placeholder="Juan"
                :is-error="status.fullname.isError"
                :error-message="status.fullname.message"
              />
            </div>
          </div>
          <div class="form__right">
            <div class="form__group">
              <label class="form__label">Email</label>
              <app-input
                v-model="form.email"
                type="email"
                placeholder="correo@mail.com"
                :is-error="status.email.isError"
                :error-message="status.email.message"
              />
            </div>
          </div>
        </div>

        <div class="form__group">
          <label class="form__label"
            >Asunto<sup class="form__required">*</sup></label
          >
          <app-input
            v-model="form.subject"
            placeholder=""
            :is-error="status.subject.isError"
            :error-message="status.subject.message"
          />
        </div>

        <div class="form__group flex flex-col">
          <label class="form__label">Mensaje</label>
          <textarea
            class="w-full border border-color-7 rounded-md p-2 outline-none ring-2 ring-transparent focus:ring-color-2"
            cols="15"
            placeholder="Saludos, me gustaria saber..."
            rows="8"
            v-model="form.message"
          ></textarea>
        </div>

        <div class="form__btn-group">
          <app-button btn-type="submit" text="Enviar" @click="submit" />
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';

const router = useRouter();

const { form, status, submitter, verify } = useForm({
  form: () => ({
    fullname: '',
    email: '',
    subject: '',
    message: '',
  }),
  rule: {
    fullname: yupFieldRule(yup.string().required('El campo es obligatorio')),
    email: [
      yupFieldRule(yup.string().required('El campo es obligatorio')),
      yupFieldRule(yup.string().email('Formato de email inválido')),
    ],
    subject: yupFieldRule(yup.string().required('El campo es obligatorio')),
    message: yupFieldRule(yup.string().required('El campo es obligatorio')),
  },
  defaultMessage: '',
});

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
    .join('&');

const { submit } = submitter(async () => {
  if (!verify()) return;
  try {
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({
        'form-name': 'contacto',
        ...form,
      }),
    });
    router.push('/gracias');
  } catch (error) {
    console.log(error);
  }
});
</script>

<style scoped>
.title {
  @apply font-bold mb-3 text-color-2 text-4xl mb-24 text-center;
}

.form__title {
  @apply font-semibold mb-8 text-color-2 text-2xl md:mb-3;
}

.form__group-alt {
  @apply mb-4 lg:mb-6;
}

.form__container {
  @apply flex flex-col justify-between md:flex-row;
}

.form__grid {
  @apply grid grid-cols-1 gap-4 md:grid-cols-2;
}

.form__left {
  @apply flex-[0_0_100%] gap-4 md:flex-[0_0_calc(50%-1rem)];
}

.form__right {
  @apply flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)];
}
</style>
