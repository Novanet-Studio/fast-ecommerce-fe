<template>
  <form class="auth-form">
    <div class="auth-form__wrapper">
      <h5 class="auth-form__title">Inicia sesión en tu cuenta</h5>
      <app-input
        v-model="form.user"
        placeholder="john o john@doe.com"
        :is-error="status.user.isError"
        :error-message="status.user.message"
      />
      <app-input
        v-model="form.password"
        placeholder="Ingrese su contraseña"
        type="password"
        :is-error="status.password.isError"
        :error-message="status.password.message"
      />
      <!-- <div class="border border-green-400 p-3 mb-4">
        <input type="checkbox" name="rememberme" v-model="form.rememberMe">
        <label for="rememberme">Recordarme</label>
      </div> -->
      <div class="auth-form__footer">
        <template v-if="state.isLoading">
          <loading />
        </template>
        <app-button
          v-else
          text="Entrar"
          @click="submit"
          :disabled="state.isDisabled"
        />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { login as loginQuery } from '~/graphql';

const graphql = useStrapiGraphQL();
const { setToken } = useStrapiAuth();
const { $notify, $store } = useNuxtApp();

const router = useRouter();
const auth = $store.auth();

const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const { form, status, submitter, verify } = useForm({
  form: () => ({
    user: '',
    password: '',
    rememberMe: false,
  }),
  rule: {
    user: yupFieldRule(yup.string().required('Por favor ingrese su usuario')),
    password: yupFieldRule(
      yup.string().required('Por favor ingrese su contraseña')
    ),
  },
  defaultMessage: '',
});

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
};

const { submit } = submitter(async () => {
  try {
    if (!verify()) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Por favor, rellene los campos obligatorios',
      });
      return;
    }

    state.isLoading = true;
    state.isDisabled = true;

    const { data } = await graphql<LoginResponse>(loginQuery, {
      identifier: form.user,
      password: form.password,
    });

    if (!data) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Usuario o Contraseña inválidos',
      });
      return;
    }

    setToken(data.login.jwt);
    auth.authenticated = true;
    Object.assign(auth.user, data.login.user);

    $notify({
      group: 'all',
      title: 'Success!',
      text: `Inicio de sesión con éxito!`,
    });

    setTimeout(() => {
      router.push('/');
    }, 1000);
  } catch (error: any) {
    console.log(error.toString());
    $notify({
      group: 'all',
      title: 'Error!',
      text: 'Hubo un problema al iniciar sesión',
    });
  } finally {
    state.isLoading = false;
    state.isDisabled = false;
    resetState();
  }
});
</script>
