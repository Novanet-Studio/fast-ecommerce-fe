<template lang="html">
    <form class="ps-form--edit-address" @click.prevent="saveAddress">
        <div class="ps-form__header">
            <h3 v-if="tipo === 'add=bill'">Billing address</h3>
            <h3 v-else>Shipping address</h3>
        </div>
        <div class="ps-form__content">
            <div class="form-group">
                <label> Country <sup>*</sup> </label>
                <v-text-field
                    v-model="country"
                    placeholder="Pais"
                    :error-messages="countryErrors"
                    @input="$v.country.$touch()"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <label> Street Address <sup>*</sup> </label>
                <v-text-field
                    v-model="strAdd"
                    placeholder="Direccion"
                    :error-messages="strAddErrors"
                    @input="$v.strAdd.$touch()"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <label> State <sup>*</sup> </label>
                <v-text-field
                    v-model="state"
                    placeholder="Direccion"
                    :error-messages="stateErrors"
                    @input="$v.state.$touch()"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <label> Postcode <sup>*</sup> </label>
                <v-text-field
                    v-model="postcode"
                    placeholder="Direccion"
                    :error-messages="postcodeErrors"
                    @input="$v.postcode.$touch()"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group submit">
                <button class="ps-btn" >Guardar</button>
            </div>
        </div>
    </form>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    props: ['tipo'],
    data(){
        return {
            country: null,
            strAdd: null,
            state: null,
            postcode: null
        }
    },
    computed: {
        user(){
            return this.$cookies.get('auth').user;
        },
        countryErrors(){
            const errors = [];
            if(!this.country){
                if (!this.$v.country.$dirty) return errors;
                !this.$v.country.required && errors.push('This field is required');
                return errors;
            }
        },
        strAddErrors(){
            const errors = [];
            if(this.strAdd){
                if (!this.$v.strAdd.$dirty) return errors;
                !this.$v.strAdd.required && errors.push('This field is required');
                return errors;
            }
        },
        stateErrors(){
            const errors = [];
            if(this.state){
                if (!this.$v.state.$dirty) return errors;
                !this.$v.state.required && errors.push('This field is required');
                return errors;
            }
        },
        postcodeErrors(){
            const errors = [];
            if(this.postcode){
                if (!this.$v.postcode.$dirty) return errors;
                !this.$v.postcode.required && errors.push('This field is required');
                return errors;
            }
        },
    },
    validations: {
        country: { required },
        strAdd: { required },
        state: { required },
        postcode: { required },
    },
    mounted(){
        console.log(this.country);
    },

    methods: {
        saveAddress(){
            this.$v.$touch();
            if (!this.$v.$invalid) {
                var addressType = ''
                if(this.tipo === 'add=bill'){
                    addressType = 'billing';
                }else if(this.tipo === 'add=shipp'){
                    addressType = 'shipping';
                }else{
                    addressType = false;
                }

                if(addressType !== false){
                    const address = {
                        direccion: this.strAdd,
                        pais: this.country,
                        estado: this.state,
                        zipcode: this.postcode
                    }
    
    
                    const data = {
                        user_id: this.user.id,
                        type: addressType,
                        address: address
                    }
                    console.log(data)
                }
            }

        }
    }
}
</script>
