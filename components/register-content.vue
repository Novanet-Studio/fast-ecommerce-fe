<template>
  <form class="auth-form">
    <div class="auth-form__wrapper">
      <h5 class="auth-form__title">Crear una cuenta</h5>
      <app-input2
        v-model="form.username"
        placeholder="John Doe"
        :error="status.username.isError"
        :error-message="status.username.message"
        icon-left="fa fa-user"
      />

      <app-input2
        v-model="form.email"
        placeholder="john@doe.com"
        :error="status.email.isError"
        :error-message="status.email.message"
        icon-left="fa fa-envelope"
      />

      <app-input2
        v-model="form.password"
        placeholder="Ingresa tu contraseña"
        :type="showPasswords ? 'text' : 'password'"
        :error="status.password.isError"
        :error-message="status.password.message"
        icon-left="fa fa-lock"
      />

      <app-input2
        v-model="form.confirmPassword"
        placeholder="Confirma contraseña"
        :type="showPasswords ? 'text' : 'password'"
        :error="status.confirmPassword.isError"
        :error-message="status.confirmPassword.message"
        icon-left="fa fa-lock"
      />

      <app-checkbox label="Show passwords" v-model="showPasswords" />

      <div class="auth-form__footer">
        <template v-if="state.isLoading">
          <loading />
        </template>
        <app-button v-else text="Registrar cuenta" @click="submit" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

const router = useRouter();
const { $store, $notify } = useNuxtApp();

const auth = $store.auth();
const product = $store.product();

const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const showPasswords = ref(false);

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm;

const { form, status, submitter, verify } = useForm({
  form: () => ({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  }),
  rule: {
    username: [
      yupFieldRule(
        yup.string().required('El nombre de usuario es obligatorio')
      ),
      yupFieldRule(yup.string().nonNullable()),
      yupFieldRule(yup.string().min(2, 'El nombre de usuario es muy corto')),
      yupFieldRule(yup.string().max(15, 'El nombre de usuario es muy largo')),
    ],
    email: [
      yupFieldRule(yup.string().required('El email es obligatorio')),
      yupFieldRule(yup.string().email('Formato de email inválido')),
    ],
    password: [
      yupFieldRule(yup.string().required('La contraseña es obligatoria')),
      yupFieldRule(
        yup
          .string()
          .matches(
            PASSWORD_REGEX,
            'Debe ser igual o mayor a 8 carácteres, una letra mayúscula, una minúscula, un número y un carácter especial'
          )
      ),
    ],
    confirmPassword: [
      yupFieldRule(yup.string().required('Debes confirmar contraseña')),
      yupFieldRule(
        yup
          .string()
          .test('match-passwords', 'Contraseñas no coinciden', (value) => {
            return form.password === value;
          })
      ),
    ],
  },
  defaultMessage: '',
});

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
};

const { submit } = submitter(async () => {
  try {
    state.isLoading = true;
    state.isDisabled = true;

    if (!verify()) {
      $notify({
        group: 'all',
        title: 'Hey!',
        text: 'Debes rellenar el formulario',
      });
      resetState();
      return;
    }

    const response = await auth.createCustomer(form.username, form.email);

    if (!response.data.id) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Hubo un error al intentar registrarte',
      });
      resetState();
      return;
    }

    const customerId = response.data.id;

    const { confirmPassword: _, ...body } = form;

    const success = await auth.register({
      customerId,
      ...body,
    });

    if (!success) return;

    setTimeout(() => {
      // if (product.cartProducts?.length) {
      //   router.push('/checkout');
      //   return;
      // }

      router.push('/');
    }, 1000);
  } catch (error: any) {
    console.log(error);
    $notify({
      group: 'all',
      title: 'Oops',
      text: 'Hubo un problema al registrarte',
    });
  } finally {
    resetState();
  }
});
</script>
