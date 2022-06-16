<template>
  <form>
    <div class="ps-form__content">
      <h5>Inicia sesión en tu cuenta</h5>
      <div class="form-group">
        <input type="text" v-model="form.user" placeholder="JohnDoe o johndoe@gmail.com"
          :class="[status.user.isError && 'input-error']" class="ps-text-field" height="50">
        <div class="errors">
          {{ status.user.message }}
        </div>
      </div>
      <div class="form-group">
        <input type="password" v-model="form.password" placeholder="Por favor, ingrese su contraseña"
          :class="[status.password.isError && 'input-error']" height="50">
        <div class="errors">
          {{ status.password.message }}
        </div>
      </div>
      <div class="form-group">
        <input type="checkbox" name="rememberme" v-model="form.rememberMe">
        <label for="rememberme">Recordarme</label>
      </div>
      <div class="form-group submit">
        <button type="submit" class="ps-btn ps-btn--fullwidth" @click.prevent="onSubmit(handleSubmit)">
          Entrar
        </button>
      </div>
    </div>
    <div class="ps-form__footer">
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import loginQuery from '../queries/login.gql';

const graphql = useStrapiGraphQL();
const { setToken } = useStrapiAuth();
const { $helpers, $notify, $store } = useNuxtApp();

const router = useRouter();

const isRequired = (val: string) => !!val || 'Este campo es obligatorio';

const { form, status, onSubmit, verify } = useForm({
  form: () => ({
    user: '',
    password: '',
    rememberMe: false,
  }),
  rule: {
    user: isRequired,
    password: isRequired,
  },
  defaultMessage: '',
});

const handleSubmit = async () => {
  if (!verify()) return;

  const [{ data }, error] = await $helpers.handleAsync(graphql<LoginResponse>(loginQuery, { identifier: form.user, password: form.password }));

  if (error?.message) {
    $notify({
      group: 'all',
      title: 'Error!',
      text: 'Usuario o Contraseña inválidos',
    });
    return;
  }

  setToken(data.login.jwt);
  $store.auth().isLoggedIn = true;

  $notify({
    group: 'all',
    title: 'Success!',
    text: `Inicio de sesión con éxito!`,
  });

  router.push('/');
}
</script>
