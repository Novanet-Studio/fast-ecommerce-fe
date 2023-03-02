<template lang="html">
    <form>
        <div class="ps-form__content">
            <h5>Inicia sesión en tu cuenta</h5>
            <div class="form-group">
                <v-text-field
                    v-model="username"
                    class="ps-text-field"
                    :error-messages="usernameErrors"
                    @input="$v.username.$touch()"
                    placeholder="Usuario o correo"
                    prepend-inner-icon="mdi-account"
                    height="50"
                    outlined
                />
            </div>
            <div class="form-group">
                <v-text-field
                    v-model="password"
                    :type="showPass ? 'text' : 'password'"
                    class="ps-text-field"
                    :error-messages="passwordErrors"
                    @input="$v.password.$touch()"
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
        <div class="ps-form__footer">
        </div>
    </form>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";

export default {
  name: "Login",
  computed: {
    usernameErrors() {
      const errors = [];
      if (this.username) {
        if (!this.$v.username.$dirty) return errors;
        !this.$v.username.required && errors.push("This field is required");
        return errors;
      }
    },
    passwordErrors() {
      const errors = [];
      if (this.password) {
        if (!this.$v.password.$dirty) return errors;
        !this.$v.password.required && errors.push("This field is required");
        return errors;
      }
    },
  },
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
          // alert(respuesta.alert);
          this.$notify({
            group: 'all',
            title: 'Error!',
            text: `Los campos son incorrectos`
          });
          console.log("No ha iniciado sesión");
        }
        console.log(respuesta);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
