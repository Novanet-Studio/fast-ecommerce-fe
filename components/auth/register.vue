<script lang="ts" setup>
import { useForm } from 'vee-validate';
import {
  object,
  string,
  minLength,
  maxLength,
  email,
  regex,
  nonNullable,
} from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';

type Form = {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
};

definePageMeta({
  pageTransition: {
    name: 'page',
  },
});

const REDIRECT_DELAY = 500;

const router = useRouter();
const { $notify } = useNuxtApp();
const auth = useAuthStore();
const state = reactive({
  isLoading: false,
  isDisabled: false,
});
const showPasswords = ref(false);

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm;

const schema = toTypedSchema(
  object({
    email: string([
      minLength(1, 'Ingrese su email'),
      email('Formato de email inválido'),
    ]),
    username: nonNullable(
      string([
        minLength(1, 'Este campo es requerido'),
        minLength(2, 'El nombre es muy corto'),
        maxLength(10, 'El nombre es muy largo'),
      ])
    ),
    password: string([
      minLength(1, 'Este campo es requerido'),
      regex(
        PASSWORD_REGEX,
        'Debe ser igual o mayor a 8 carácteres, una letra mayúscula, una minúscula, un número y un carácter especial'
      ),
    ]),
    confirmPassword: string([minLength(1, 'Este campo es requerido')]),
  })
);

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
};

const { handleSubmit, defineInputBinds, setFieldError } = useForm<Form>({
  validationSchema: schema,
});

const password = defineInputBinds('password');
const confirmPassword = defineInputBinds('confirmPassword');

const submit = handleSubmit(async (data) => {
  try {
    state.isLoading = true;
    state.isDisabled = true;

    if (data.password !== data.confirmPassword) return;

    const response = await auth.createCustomer(data.username, data.email);

    if (!response?.value?.data?.id) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: 'Hubo un error al intentar registrarte',
      });
      resetState();
      return;
    }

    const customerId = response.value.data.id;
    const { confirmPassword: _, ...body } = data;

    await auth.register({
      customerId,
      ...body,
    });

    setTimeout(() => {
      router.push('/');
    }, REDIRECT_DELAY);
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Oops',
      text: 'Hubo un problema al registrarte, intente de nuevo',
    });
  } finally {
    resetState();
  }
});

watchEffect(() => {
  if (
    confirmPassword.value.value &&
    password.value.value &&
    confirmPassword.value.value?.length >= 8 &&
    password.value.value !== confirmPassword.value.value
  ) {
    setFieldError('confirmPassword', 'Las contraseñas no coinciden');
  }
});
</script>

<template>
  <form class="auth-form">
    <div class="auth-form__wrapper">
      <h5 class="auth-form__title">Crear una cuenta</h5>
      <app-input
        name="username"
        placeholder="John Doe"
        icon-left="fa fa-user"
      />
      <app-input
        name="email"
        placeholder="john@doe.com"
        icon-left="fa fa-envelope"
      />
      <app-input
        name="password"
        placeholder="Ingresa tu contraseña"
        :type="showPasswords ? 'text' : 'password'"
        icon-left="fa fa-lock"
      />
      <app-input
        name="confirmPassword"
        placeholder="Confirma contraseña"
        :type="showPasswords ? 'text' : 'password'"
        icon-left="fa fa-lock"
      />
      <app-checkbox label="Show passwords" v-model="showPasswords" />
      <div class="auth-form__footer">
        <app-button @click="submit" :loading="state.isLoading">
          Registrar cuenta
        </app-button>
      </div>
    </div>
  </form>
</template>
