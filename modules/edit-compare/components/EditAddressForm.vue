<template>
  <form class="ps-form--edit-address" @submit.prevent="onSubmit(handleSave)">
    <div class="ps-form__header">
      <h3 v-if="type === 'add=bill'">Billing address</h3>
      <h3 v-else>Shipping address</h3>
    </div>
    <div class="ps-form__content">
      <div class="form-group">
        <label> Country <sup>*</sup> </label>
        <input type="text" name="country" v-model="form.country" :class="[status.country.isError && 'input-error']"
          placeholder="Venezuela">
        <div class="errors">
          {{ status.country.message }}
        </div>
        <!-- <v-text-field v-model="country" placeholder="Pais" :error-messages="countryErrors" @input="$v.country.$touch()"
          outlined height="50" /> -->
      </div>
      <div class="form-group">
        <label for="streetAddress"> Street Address <sup>*</sup> </label>
        <input type="text" name="streetAddress" v-model="form.streetAddress"
          :class="[status.streetAddress.isError && 'input-error']" placeholder="Av John, calle Doe">
        <!-- <v-text-field v-model="strAdd" placeholder="Direccion" :error-messages="strAddErrors"
          @input="$v.strAdd.$touch()" outlined height="50" /> -->
        <div class="errors">
          {{ status.streetAddress.message }}
        </div>
      </div>
      <div class="form-group">
        <label for="state"> State <sup>*</sup> </label>
        <input type="text" name="state" v-model="form.state" :class="[status.state.isError && 'input-error']"
          placeholder="Edo Miranda">
        <!-- <v-text-field v-model="state" placeholder="Direccion" :error-messages="stateErrors" @input="$v.state.$touch()"
          outlined height="50" /> -->
        <div class="errors">
          {{ status.state.message }}
        </div>
      </div>
      <div class="form-group">
        <label> Postcode <sup>*</sup> </label>
        <input type="text" name="postcode" v-model="form.postcode" :class="[status.postcode.isError && 'input-error']"
          placeholder="0000">
        <!-- <v-text-field v-model="postcode" placeholder="Direccion" :error-messages="postcodeErrors"
          @input="$v.postcode.$touch()" outlined height="50" /> -->
        <div class="errors">
          {{ status.postcode.message }}
        </div>
      </div>
      <div class="form-group submit">
        <button class="ps-btn" type="submit">Guardar</button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
type Props = {
  type: string;
}

defineProps<Props>();

const isRequired = (val) => !!val || 'Este campo es requerido';

const { form, status, reset, onSubmit, clearErrors, verify } = useForm({
  form: () => ({
    country: '',
    streetAddress: '',
    state: '',
    postcode: ''
  }),
  rule: {
    country: isRequired,
    streetAddress: isRequired,
    state: isRequired,
    postcode: isRequired,
  }
});


const handleSave = () => {
  if (!verify()) {
    console.log('Not sent to server');
    return;
  }

  console.log('Save data');
}

// import { email, required } from 'vuelidate/lib/validators';
// import { validationMixin } from 'vuelidate';

// export default {
//   props: ['tipo'],
//   data() {
//     return {
//       country: null,
//       strAdd: null,
//       state: null,
//       postcode: null,
//       lastAddress: false,
//       addId: false
//     }
//   },
//   computed: {
//     user() {
//       return this.$cookies.get('auth').user;
//     },
//     countryErrors() {
//       const errors = [];
//       if (!this.country) {
//         if (!this.$v.country.$dirty) return errors;
//         !this.$v.country.required && errors.push('This field is required');
//         return errors;
//       }
//     },
//     strAddErrors() {
//       const errors = [];
//       if (this.strAdd) {
//         if (!this.$v.strAdd.$dirty) return errors;
//         !this.$v.strAdd.required && errors.push('This field is required');
//         return errors;
//       }
//     },
//     stateErrors() {
//       const errors = [];
//       if (this.state) {
//         if (!this.$v.state.$dirty) return errors;
//         !this.$v.state.required && errors.push('This field is required');
//         return errors;
//       }
//     },
//     postcodeErrors() {
//       const errors = [];
//       if (this.postcode) {
//         if (!this.$v.postcode.$dirty) return errors;
//         !this.$v.postcode.required && errors.push('This field is required');
//         return errors;
//       }
//     },
//   },
//   validations: {
//     country: { required },
//     strAdd: { required },
//     state: { required },
//     postcode: { required },
//   },
//   mounted() {
//     console.log(this.country);
//     this.getLastAddress();
//   },

//   methods: {
//     setType() {
//       var addressType = ''
//       if (this.tipo === 'add=bill') {
//         return addressType = 'billing';
//       } else if (this.tipo === 'add=shipp') {
//         return addressType = 'shipping';
//       } else {
//         return addressType = false;
//       }
//     },
//     saveAddress() {
//       this.$v.$touch();
//       if (!this.$v.$invalid) {

//         const addressType = this.setType();

//         if (addressType !== false) {
//           const address = {
//             direccion: this.strAdd,
//             pais: this.country,
//             estado: this.state,
//             zipcode: this.postcode
//           }

//           const data = {
//             data: {
//               user_id: this.user.id,
//               type: addressType,
//               address: address
//             }
//           }
//           console.log(data)
//           this.sendToStrapi(data);

//         }
//       }

//     },
//     async getLastAddress() {
//       const userId = this.user.id;
//       const type = this.setType();
//       if (type !== false) {
//         const data = {
//           userId: userId,
//           type: type
//         }
//         const respuesta = await this.$store.dispatch('checkout/getAddress', data).then(res => {
//           if (res.length > 0) {
//             const address = res[0].attributes.address;
//             this.lastAddress = true;
//             this.addId = res[0].id;
//             this.country = address.pais;
//             this.state = address.estado;
//             this.strAdd = address.direccion;
//             this.postcode = address.zipcode;
//           }
//         }).catch(err => {
//           console.log(err)
//         })
//       }
//     },
//     sendToStrapi(data) {
//       if (this.lastAddress === true) {
//         this.updateStrapi(data);
//       } else if (this.lastAddress === false) {
//         this.postStrapi(data);
//       }
//     },
//     async postStrapi(data) {
//       const respuesta = await this.$store.dispatch('checkout/setAddress', data).then(res => {
//         if (res.status == 200) {
//           this.$router.push('/addresses');
//         }
//       }).catch(error => {
//         // alert('hubo un error')
//         this.$notify({
//           group: 'all',
//           title: 'Error',
//           text: `Hubo un error`
//         });

//       })
//     },
//     async updateStrapi(data) {
//       if (this.addId !== false) {
//         const setData = {
//           addId: this.addId,
//           data: data
//         }
//         const respuesta = await this.$store.dispatch('checkout/updateAddress', setData).then(res => {
//           if (res.status == 200) {
//             this.$router.push('/addresses');
//           }
//         }).catch(error => {
//           // alert('hubo un error')
//           this.$notify({
//             group: 'all',
//             title: 'Error',
//             text: `Hubo un error`
//           });
//         })
//       } else {
//         // alert('hubo un error')
//         this.$notify({
//           group: 'all',
//           title: 'Error',
//           text: `Hubo un error`
//         });
//       }
//     },

//   }
// }
</script>
