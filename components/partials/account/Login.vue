<template lang="html">
  <form>
    <div class="ps-form__content">
      <h5>Inicia sesión en tu cuenta</h5>
      <div class="form-group">
        <v-text-field
          v-model="username"
          :rules="[() => !!username || 'Éste campo es obligatorio']"
          placeholder="Usuario o correo"
          color="#979696"
          prepend-inner-icon="mdi-account"
          height="50"
          outlined
        />
      </div>
      <div class="form-group">
        <v-text-field
          v-model="password"
          :type="showPass ? 'text' : 'password'"
          :rules="[() => !!password || 'Éste campo es requerido']"
          color="#979696"
          placeholder="Por favor ingrese su password"
          prepend-inner-icon="mdi-lock"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
          height="50"
          outlined
        />
      </div>
      <div class="form-group">
        <v-checkbox label="Recordarme" color="warning" />
      </div>
      <div class="form-group submit">
        <button
          type="submit"
          class="ps-btn ps-btn--fullwidth"
          @click.prevent="handleSubmit"
        >
          Entrar
        </button>
      </div>
    </div>
    <div class="ps-form__footer"></div>
  </form>
</template>

<script>
import { required } from "vuelidate/lib/validators";

export default {
  name: "Login",
  data() {
    return {
      username: null,
      password: null,
      showPass: false,
    };
  },
  validations: {
    username: { required },
    password: { required },
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch();
      const user = {
        username: this.username,
        password: this.password,
      };
      if (!this.$v.$invalid) {
        var respuesta = await this.$store.dispatch("auth/getUser", user);
        if (respuesta.jwt) {
          this.$store.dispatch("auth/setAuthStatus", true);

          this.$cookies.set("auth", respuesta, {
            path: "/",
            maxAge: 60 * 60 * 24 * 7,
          });
          this.$router.push("/");
          console.log("logeado");
        } else {
          this.$notify({
            group: "all",
            title: "Error!",
            text: `Los campos son incorrectos`,
          });
        }
      }
    },
  },
};
</script>
