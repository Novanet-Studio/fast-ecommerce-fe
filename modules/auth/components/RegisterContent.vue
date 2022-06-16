<template>
  <form>
    <div class="ps-form__content">
      <h5>Crear una cuenta</h5>
      <div class="form-group">
        <input v-model="form.username" placeholder="John Doe" class="ps-text-field"
          :class="status.username.isError && 'input-error'" />
        <div v-show="status.username.isError" class="errors">
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
      <div class="form-group">
        <input v-model="form.confirmPassword" placeholder="Confirmar contraseña" class="ps-text-field"
          :class="status.confirmPassword.isError && 'input-error'" />
        <div class="errors">
          {{ status.confirmPassword.message }}
        </div>
      </div>
      <div class="form-group submit">
        <button class="ps-btn ps-btn--fullwidth" type="submit" @click.prevent="onSubmit(handleSubmit)">
          Registrar cuenta
        </button>
        <template v-if="state.isLoading">
          <loading />
        </template>
      </div>
    </div>
    <div class="ps-form__footer"></div>
  </form>
</template>

<script lang="ts" setup>
definePageMeta({
  pageTransition: {
    name: 'zoom',
  }
});

import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
import registerQuery from '../queries/register.gql';

const graphql = useStrapiGraphQL();
const router = useRouter();
const { $notify, $helpers } = useNuxtApp();

const state = reactive({
  isLoading: false,
  isDisabled: false,
});

const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/gm;

const { form, status, onSubmit, verify } = useForm({
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
      yupFieldRule(yup.string().test('match-passwords', 'Contraseñas no coinciden', (value: string) => {
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

const handleSubmit = async () => {
  console.log(form);
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

  const [{ data }, error] = await $helpers.handleAsync(graphql<RegisterResponse>(registerQuery, {
    ...form,
  }));

  if (error?.message) {
    $notify({
      group: 'all',
      title: 'Hey!',
      text: 'Hubo un error al intentar registrarte!',
    });
    resetState();
    return;
  }

  console.log(data);

  $notify({
    group: 'all',
    title: 'Hey!',
    text: 'Te has registrado exitosamente!',
  });
  resetState();

  router.push('/login');
}
</script>


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
