<script lang="ts" setup>
import { useForm } from 'vee-validate';
import { object, string, minLength } from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';

type Form = {
  user: string;
  password: string;
  rememberMe: boolean;
}

const REDIRECT_DELAY = 500;

const { $notify } = useNuxtApp();

const router = useRouter();
const auth = useAuthStore();
const showPassword = ref(false);
const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const schema = toTypedSchema(
  object({
    user: string([minLength(1, 'Este campo es requerido')]),
    password: string([minLength(1, 'Este campo es requerido')]),
  })
)

const { handleSubmit } = useForm<Form>({
  validationSchema: schema,
});

const resetState = () => {
  state.isLoading = false;
  state.isDisabled = false;
};

const submit = handleSubmit(async (data, { resetForm }) => {

  console.log(data)
  try {
    state.isLoading = true;
    state.isDisabled = true;

    const success = await auth.login(data.user, data.password)

    if (!success) {
      $notify({
        group: 'all',
        title: 'Error',
        text: 'Un error ha occurrido, intente ingresar de nuevo'
      });
      return;
    }

    setTimeout(() => {
      router.push('/');
    }, REDIRECT_DELAY);
  } catch (error) {
    $notify({
      group: 'all',
      title: 'Error!',
      text: 'Hubo un problema al iniciar sesión',
    });
  } finally {
    resetState();
    resetForm();
  }
})
</script>

<template>
  <form class="auth-form">
    <div class="auth-form__wrapper">
      <h5 class="auth-form__title">Inicia sesión en tu cuenta</h5>
      <app-input name="user" placeholder="john o john@doe.com">
        <template #left>
          <div class="i-ph-bag-light text-[20px] text-gray-400" />
        </template>
      </app-input>
      <app-input name="password" placeholder="Ingrese su contraseña" :type="showPassword ? 'text' : 'password'">
        <template #left>
          <div class="i-ph-lock-light text-[20px] text-gray-400" />
        </template>
        <template #right>
          <div @click="showPassword = !showPassword" class="hover:cursor-pointer group">
            <div class="i-ph-eye-light text-[20px] transition text-gray-400 group-hover:text-gray-500"
              v-if="!showPassword" />
            <div class="i-ph-eye-slash-light text-[20px] transition text-gray-400 group-hover:text-gray-500" v-else />
          </div>
        </template>
      </app-input>
      <div class="auth-form__footer">
        <app-button @click="submit" :loading="state.isLoading" :disabled="state.isDisabled">
          Entrar
        </app-button>
      </div>
    </div>
  </form>
</template>
