<template>
  <form>
    <div class="bg-white p-6 max-w-[26rem] mx-auto mb-4">
      <h5 class="text-base mb-4 text-yellow-500">Inicia sesión en tu cuenta</h5>
      <the-input v-model="form.user" placeholder="john o john@doe.com" :is-error="status.user.isError"
        :error-message="status.user.message" />
      <the-input v-model="form.password" placeholder="Ingrese su contraseña" :is-error="status.password.isError"
        :error-message="status.password.message" />
      <!-- <div class="border border-green-400 p-3 mb-4">
        <input type="checkbox" name="rememberme" v-model="form.rememberMe">
        <label for="rememberme">Recordarme</label>
      </div> -->
      <div class="py-3 mb-4 mt-2">
        <template v-if="state.isLoading">
          <loading />
        </template>
        <the-button v-else text="Entrar" @click="onSubmit(handleSubmit)" :disabled="state.isDisabled" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import loginQuery from '../queries/login.gql';

const graphql = useStrapiGraphQL();
const { setToken } = useStrapiAuth();
const { $helpers, $notify, $store } = useNuxtApp();

const router = useRouter();
const auth = $store.auth();

const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const { form, status, onSubmit, verify } = useForm({
  form: () => ({
    user: '',
    password: '',
    rememberMe: false,
  }),
  rule: {
    user: yupFieldRule(yup.string().required('Por favor ingrese su usuario')),
    password: yupFieldRule(yup.string().required('Por favor ingrese su contraseña')),
  },
  defaultMessage: '',
});

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
}

const handleSubmit = async () => {
  try {
    if (!verify()) return;

    state.isLoading = true;
    state.isDisabled = true;

    const [{ data }, error] = await $helpers.handleAsync(graphql<LoginResponse>(loginQuery, { identifier: form.user, password: form.password }));

    if (!data) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Usuario o Contraseña inválidos',
      });
      // resetState();
      return;
    }

    if (error?.message) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Hubo un problema al iniciar sesión',
      });
      // resetState();
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
  } catch (error) {
    console.log(error.toString());
  } finally {
    state.isLoading = false;
    state.isDisabled = false;
    resetState();
  }
}
</script>
