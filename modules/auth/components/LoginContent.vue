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
        <!-- <v-text-field v-model="username" class="ps-text-field" :error-messages="usernameErrors"
          @input="$v.username.$touch()" placeholder="Usuario o correo" height="50" outlined /> -->
      </div>
      <div class="form-group">
        <input type="password" v-model="form.password" placeholder="Por favor, ingrese su contraseña"
          :class="[status.password.isError && 'input-error']" height="50">
        <div class="errors">
          {{ status.password.message }}
        </div>
        <!-- <v-text-field v-model="password" type="password" class="ps-text-field" :error-messages="passwordErrors"
          @input="$v.password.$touch()" placeholder="Por favor ingrese su password" height="50" outlined /> -->
      </div>
      <div class="form-group">
        <input type="checkbox" name="rememberme" v-model="form.rememberMe">
        <label for="rememberme">Recordarme</label>
        <!-- <v-checkbox label="Recordarme" color="warning" /> -->
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

const isRequired = (val) => !!val || 'Este campo es obligatorio';

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

const handleSubmit = () => {
  if (!verify()) return;

  console.log(form);
}
</script>
