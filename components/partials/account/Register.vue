<template lang="html">
  <form>
    <div class="ps-form__content">
      <h5>Crear una cuenta</h5>
      <div class="form-group">
        <v-text-field
          v-model="username"
          :rules="[rules.required]"
          placeholder="Usuario"
          prepend-inner-icon="mdi-account"
          outlined
          height="50"
        />
      </div>
      <div class="form-group">
        <v-text-field
          v-model="email"
          :rules="[rules.required, rules.email]"
          prepend-inner-icon="mdi-email"
          placeholder="Email"
          outlined
          height="50"
        />
      </div>
      <div class="form-group">
        <v-text-field
          v-model="password"
          :rules="[rules.required]"
          :type="showPass ? 'text' : 'password'"
          placeholder="Contraseña"
          prepend-inner-icon="mdi-lock"
          :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPass = !showPass"
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
        <template v-if="loading">
          <loading />
        </template>
      </div>
    </div>
    <div class="ps-form__footer"></div>
  </form>
</template>

<script>
import { email, required } from "vuelidate/lib/validators";
import { v4 as uuidv4 } from "uuid";
import Loading from "~/components/elements/commons/Loading";

export default {
  name: "Register",
  components: { Loading },
  data() {
    return {
      username: null,
      email: null,
      password: null,
      loading: false,
      showPass: false,
      rules: {
        required: (value) => !!value || "Éste campo es requirido",
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(value) || "Email inválido";
        },
      },
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
          await this.createCustomer(this.username, this.email).then(
            async (res) => {
              const respuesta = res;
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
      } else {
        this.$notify({
          group: "all",
          title: "Error",
          text: `Hubo un error al registrar`,
        });
      }
    },
  },
};
</script>
