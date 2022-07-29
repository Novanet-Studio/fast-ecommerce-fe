<template lang="html">
  <form>
    <div class="ps-form__content">
      <h5>Crear una cuenta</h5>
      <div class="form-group">
        <v-text-field
          v-model="username"
          :error-messages="usernameErrors"
          @input="$v.username.$touch()"
          placeholder="Usuario"
          class="ps-text-field"
          outlined
          height="50"
        />
      </div>
      <div class="form-group">
        <v-text-field
          v-model="email"
          :error-messages="emailErrors"
          @input="$v.email.$touch()"
          placeholder="Email"
          class="ps-text-field"
          outlined
          height="50"
        />
      </div>
      <div class="form-group">
        <v-text-field
          v-model="password"
          :error-messages="passwordErrors"
          @input="$v.password.$touch()"
          placeholder="Contraseña"
          class="ps-text-field"
          outlined
          height="50"
        />
      </div>
      <div class="form-group submit">
        <button
          type="submit"
          class="ps-btn ps-btn--fullwidth"
          @click.prevent="handleSubmit"
          id="botonRegistro"
        >
          Registrar cuenta
        </button>
        <template v-if="loading === true">
          <loading />
        </template>
      </div>
    </div>
    <div class="ps-form__footer"></div>
  </form>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { validationMixin } from "vuelidate";
import { v4 as uuidv4 } from "uuid";
import Loading from "~/components/elements/commons/Loading";

export default {
  name: "Register",
  components: { Loading },

  computed: {
    usernameErrors() {
      const errors = [];
      if (this.username) {
        if (!this.$v.username.$dirty) return errors;
        !this.$v.username.required && errors.push("This field is required");
        return errors;
      }
    },
    emailErrors() {
      const errors = [];
      if (this.email) {
        if (!this.$v.email.$dirty) return errors;
        !this.$v.email.required && errors.push("This field is required");
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
      email: null,
      password: null,
      loading: false,
    };
  },
  validations: {
    username: { required },
    email: { required },
    password: { required },
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        // creating customerId in square and passing it to strapi to save that reference
        try {
          const btn = document.getElementById("botonRegistro");
          btn.disabled = true;
          this.loading = true;
          // return console.log(this.username, this.email)
          await this.createCustomer(this.username, this.email).then(
            async (res) => {
              const respuesta = res;
              // return console.log(res)
              if (respuesta.length > 0) {
                const customerid = respuesta[0].id;
                if (customerid && respuesta[1] == "success") {
                  this.registerUser(customerid);
                  btn.disabled = false;
                }
              } else {
                this.$notify({
                  group: "all",
                  title: "Error!",
                  text: `Ha ocurrido un error`,
                });
                // alert("Ha ocurrido un error");
              }
            }
          );
        } catch (error) {
          this.$notify({
            group: "all",
            title: "Error!",
            text: `Error al registrar!`,
          });
          console.log(error, "Error al registrar");
        }
      }
    },

    async createCustomer(username, email) {
      var idempotencyKeyGen = uuidv4();
      const data = {
        idempotencyKey: idempotencyKeyGen,
        givenName: username,
        emailAddress: email,
      };
      var datos = [];
      const customerId = this.$fire.functions.httpsCallable("createCustomer");
      await customerId(data)
        .then(async (res) => {
          const squareResponse = JSON.parse(res.data);
          const customerinfo = await squareResponse.customer;
          if (customerinfo) {
            datos.push(customerinfo);
            datos.push("success");
          }
          console.log("===> respuesta square", squareResponse.customer);
          // return datos
        })
        .catch((error) => {
          console.log(error);
        });
      return datos;
    },

    async registerUser(customerId) {
      const data = {
        username: this.username,
        email: this.email,
        password: this.password,
        customer_id: customerId,
      };
      const respuesta = await this.$store.dispatch("auth/setNewUser", data);
      if (respuesta.jwt) {
        this.loading = false;
        //status usuario loggeado true
        this.$notify({
          group: "all",
          title: "Registro",
          text: `Usuario registrado con exito`,
        });
        this.$store.dispatch("auth/setAuthStatus", true);
        this.$cookies.set("auth", respuesta, {
          path: "/",
          maxAge: 60 * 60 * 24 * 7,
        });
        this.$router.push("/");
        // alert("Usuario registrado con éxito");
      } else {
        this.$notify({
          group: "all",
          title: "Error",
          text: `Hubo un error al registrar`,
        });
        // alert(respuesta.alert);
      }

      console.log(respuesta);
    },
  },
};
</script>

<style lang="scss" scoped></style>
