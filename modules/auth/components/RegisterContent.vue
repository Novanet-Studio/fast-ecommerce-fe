<template>
  <form>
    <div class="bg-white p-6 max-w-[26rem] mx-auto mb-4">
      <h5 class="text-base mb-4 text-yellow-500">Crear una cuenta</h5>
      <the-input v-model="form.username" placeholder="John Doe" :is-error="status.username.isError"
        :error-message="status.username.message" />

      <the-input v-model="form.email" placeholder="john@doe.com" :is-error="status.email.isError"
        :error-message="status.email.message" />

      <the-input v-model="form.password" placeholder="Ingresa tu contraseña" type="password"
        :is-error="status.password.isError" :error-message="status.password.message" />

      <the-input v-model="form.confirmPassword" placeholder="Confirma contraseña" type="password"
        :is-error="status.confirmPassword.isError" :error-message="status.confirmPassword.message" />

      <div class="py-3 mb-4 mt-2">
        <template v-if="state.isLoading">
          <loading />
        </template>
        <the-button v-else text="Registrar cuenta" @click="submit" />
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import { HttpsCallable } from '@/modules/shared/shared-types';
import registerQuery from '../queries/register.gql';

definePageMeta({
  pageTransition: {
    name: 'zoom',
  }
});

const graphql = useStrapiGraphQL();
const { setToken } = useStrapiAuth();
const router = useRouter();
const { $store, $notify, $httpsCallable } = useNuxtApp();

const auth = $store.auth();

const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm;

const { form, status, submitter, verify } = useForm({
  form: () => ({
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
  }),
  rule: {
    username: [
      yupFieldRule(yup.string().required('El nombre de usuario es obligatorio')),
      yupFieldRule(yup.string().nullable(false)),
      yupFieldRule(yup.string().min(2, 'El nombre de usuario es muy corto')),
      yupFieldRule(yup.string().max(15, 'El nombre de usuario es muy largo')),
    ],
    email: [
      yupFieldRule(yup.string().required('El email es obligatorio')),
      yupFieldRule(yup.string().email('Formato de email inválido')),
    ],
    password: [
      yupFieldRule(yup.string().required('La contraseña es obligatoria')),
      yupFieldRule(yup.string().matches(PASSWORD_REGEX, 'Debe contener 8 carácteres, una letra mayúscula, una minúscula, un número y un carácter especial')),
    ],
    confirmPassword: [
      yupFieldRule(yup.string().required('Debes confirmar contraseña')),
      yupFieldRule(yup.string().test('match-passwords', 'Contraseñas no coinciden', (value) => {
        return form.password === value;
      })),
    ]
  },
  defaultMessage: '',
});

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
}

const createCustomer = async ({ user, email }: { user: string, email: string }) => {
  const customerId = $httpsCallable(HttpsCallable.CreateCustomer);
  const idempotencyKey = crypto.randomUUID();
  const data = {
    idempotencyKey,
    givenName: user,
    emailAddress: email,
  };
  const customerResponse = await customerId(data);
  return customerResponse;
}

const registerUser = async (customerId: string) => {
  try {
    const body = {
      email: form.email,
      username: form.username,
      password: form.password,
      customerId,
    };
    const { data } = await graphql<RegisterResponse>(registerQuery, body);

    if (!data) {
      $notify({
        group: 'all',
        title: 'Oops',
        text: 'El usuario o email ya existen',
      });
      resetState();
      return;
    }

    setToken(data.register.jwt);
    auth.authenticated = true;
    Object.assign(auth.user, data.register.user);

    $notify({
      group: 'all',
      title: 'Hey!',
      text: 'Te has registrado exitosamente!',
    });

    router.push('/');
  } catch (error) {
    console.log(error);
    $notify({
      group: 'all',
      title: 'Oops',
      text: 'Hubo un problema al registrarte',
    });
  } finally {
    resetState();
  }
}

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

    const response = await createCustomer({
      user: form.username,
      email: form.email,
    }) as any;

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

    await registerUser(customerId);

  } catch (error: any) {
    console.log(error);
  } finally {
    resetState();

  }
})
</script>
