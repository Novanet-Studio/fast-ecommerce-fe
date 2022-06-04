<template>
  <form>
    <div class="ps-form__content">
      <h5>Crear una cuenta</h5>
      <div class="form-group">
        <input v-model="form.username" placeholder="John Doe" class="ps-text-field"
          :class="status.username.isError && 'input-error'" />
        <div class="errors">
          {{ status.username.message }}
        </div>
      </div>
      <div class="form-group">
        <input v-model="form.email" placeholder="john@doe.com" class="ps-text-field"
          :class="status.email.isError && 'input-error'" />
        <div class="errors">
          {{ status.email.message }}
        </div>
      </div>
      <div class="form-group">
        <input v-model="form.password" placeholder="Contraseña" class="ps-text-field"
          :class="status.password.isError && 'input-error'" />
        <div class="errors">
          {{ status.password.message }}
        </div>
      </div>
      <div class="form-group submit">
        <button type="submit" class="ps-btn ps-btn--fullwidth" @click.prevent="onSubmit(handleSubmit)" id="registerBtn">
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

<script lang="ts" setup>
import { useForm } from 'slimeform';

const loading = ref<boolean>(false);

const EMAIL_REGEX = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g;
const PASSWORD_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
const USERNAME_REGEX = /[a-zA-Z][a-zA-Z0-9-_]{3,32}/gi;

const { form, status, onSubmit } = useForm({
  form: () => ({
    username: '',
    email: '',
    password: '',
  }),
  rule: {
    username: [
      (val: string) => !!val || 'El campo es obligatorio',
      (val: string) => val.length < 3 && 'El nombre del usuario es muy corto',
      (val: string) => val.length > 15 && 'El nombre del usuario es muy largo',
      (val: string) => USERNAME_REGEX.test(val) || 'Nombre de usuario es inválido',
    ],
    email: [
      (val: string) => !!val || 'El campo es obligatorio',
      (val: string) => EMAIL_REGEX.test(val) || 'Formato de email inválido',
    ],
    password: [
      (val: string) => !!val || 'El campo es obligatorio',
      (val: string) => PASSWORD_REGEX.test(val) || 'Contraseña no válida, debe contener al menos 8 caracteres, 1 letra en mayuscula, una en minuscula, un numero y un caracter especial',
    ],
  }
});

const handleSubmit = () => { }

// export default {
//   methods: {
//     async handleSubmit() {
//       this.$v.$touch();
//       if (!this.$v.$invalid) {
//         // creating customerId in square and passing it to strapi to save that reference
//         try {
//           const btn = document.getElementById("registerBtn");
//           btn.disabled = true;
//           this.loading = true;
//           // return console.log(this.username, this.email)
//           await this.createCustomer(this.username, this.email).then(
//             async (res) => {
//               const respuesta = res;
//               // return console.log(res)
//               if (respuesta.length > 0) {
//                 const customerid = respuesta[0].id;
//                 if (customerid && respuesta[1] == "success") {
//                   this.registerUser(customerid);
//                   btn.disabled = false;
//                 }
//               } else {
//                 this.$notify({
//                   group: 'all',
//                   title: 'Error!',
//                   text: `Ha ocurrido un error`
//                 });
//                 // alert("Ha ocurrido un error");
//               }
//             }
//           );
//         } catch (error) {
//           this.$notify({
//             group: 'all',
//             title: 'Error!',
//             text: `Error al registrar!`
//           });
//           console.log(error, "Error al registrar");
//         }
//       }
//     },

//     async createCustomer(username, email) {
//       var idempotencyKeyGen = uuidv4();
//       const data = {
//         idempotencyKey: idempotencyKeyGen,
//         givenName: username,
//         emailAddress: email,
//       };
//       var datos = [];
//       const customerId = this.$fire.functions.httpsCallable("createCustomer");
//       await customerId(data)
//         .then(async (res) => {
//           const squareResponse = JSON.parse(res.data);
//           const customerinfo = await squareResponse.customer;
//           if (customerinfo) {
//             datos.push(customerinfo);
//             datos.push("success");
//           }
//           console.log("===> respuesta square", squareResponse.customer);
//           // return datos
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//       return datos;
//     },

//     async registerUser(customerId) {
//       const data = {
//         username: this.username,
//         email: this.email,
//         password: this.password,
//         customer_id: customerId,
//       };
//       const respuesta = await this.$store.dispatch("auth/setNewUser", data);
//       if (respuesta.jwt) {
//         this.loading = false;
//         //status usuario loggeado true
//         this.$notify({
//           group: 'all',
//           title: 'Exito',
//           text: `Usuario registrado con exito`
//         });
//         this.$store.dispatch("auth/setAuthStatus", true);
//         this.$cookies.set("auth", respuesta, {
//           path: "/",
//           maxAge: 60 * 60 * 24 * 7,
//         });
//         this.$router.push("/");
//         // alert("Usuario registrado con éxito");
//       } else {
//         this.$notify({
//           group: 'all',
//           title: 'Error',
//           text: `Hubo un error al registrar`
//         });
//         // alert(respuesta.alert);
//       }

//       console.log(respuesta);
//     },
//   },
// };
</script>
