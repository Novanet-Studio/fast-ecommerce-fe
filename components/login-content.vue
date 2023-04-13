<template>
  <form class="auth-form">
    <div class="auth-form__wrapper">
      <h5 class="auth-form__title">Inicia sesión en tu cuenta</h5>
      <app-input2
        v-model="form.user"
        placeholder="john o john@doe.com"
        :error="status.user.isError"
        :error-message="status.user.message"
      >
        <template #left>
          <ph-user :size="20" weight="light" class="text-gray-400" />
        </template>
      </app-input2>
      <app-input2
        v-model="form.password"
        placeholder="Ingrese su contraseña"
        :type="showPassword ? 'text' : 'password'"
        :error="status.password.isError"
        :error-message="status.password.message"
      >
        <template #left>
          <ph-lock :size="20" weight="light" class="text-gray-400" />
        </template>
        <template #right>
          <div @click="handleIconClick" class="hover:cursor-pointer group">
            <ph-eye
              :size="20"
              weight="light"
              class="transition text-gray-400 group-hover:text-gray-500"
              v-if="!showPassword"
            />
            <ph-eye-slash
              :size="20"
              weight="light"
              class="transition text-gray-400 group-hover:text-gray-500"
              v-else
            />
          </div>
        </template>
      </app-input2>
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
import { PhUser, PhLock, PhEye, PhEyeSlash } from '@phosphor-icons/vue';
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';

const { $notify, $store } = useNuxtApp();

const router = useRouter();
const auth = $store.auth();
const product = $store.product();

const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const showPassword = ref(false);

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

const handleIconClick = () => {
  showPassword.value = !showPassword.value;
};

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

    const success = await auth.login(form.user, form.password);

    if (!success) return;

    setTimeout(() => {
      // if (product.cartProducts?.length) {
      //   router.push('/checkout');
      //   return;
      // }

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
