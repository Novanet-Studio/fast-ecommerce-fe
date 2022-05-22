<template lang="html">
    <form class="ps-form--edit-address" >
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
                <button class="ps-btn" @click.prevent="saveAddress" >Guardar</button>
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
            postcode: null,
            lastAddress: false,
            addId: false
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
        this.getLastAddress();
    },

    methods: {
        setType(){
            var addressType = ''
            if(this.tipo === 'add=bill'){
                return addressType = 'billing';
            }else if(this.tipo === 'add=shipp'){
                return addressType = 'shipping';
            }else{
                return addressType = false;
            }
        },
        saveAddress(){
            this.$v.$touch();
            if (!this.$v.$invalid) {

                const addressType = this.setType();

                if(addressType !== false){
                    const address = {
                        direccion: this.strAdd,
                        pais: this.country,
                        estado: this.state,
                        zipcode: this.postcode
                    }

                    const data = {
                        data:{
                            user_id: this.user.id,
                            type: addressType,
                            address: address
                        }
                    }
                    console.log(data)
                    this.sendToStrapi(data); 
                    
                }
            }

        },
        async getLastAddress(){
            const userId = this.user.id;
            const type = this.setType();
            if(type !== false){
                const data = {
                    userId: userId,
                    type: type
                }
                const respuesta = await this.$store.dispatch('checkout/getAddress', data ).then(res=> {
                    if(res.length > 0){
                        const address = res[0].attributes.address;
                        this.lastAddress = true; 
                        this.addId = res[0].id;
                        this.country = address.pais;
                        this.state = address.estado;
                        this.strAdd = address.direccion;
                        this.postcode = address.zipcode;
                    }
                }).catch(err=>{
                    console.log(err)
                })
            }
        },
        sendToStrapi(data){
            if(this.lastAddress === true){
                this.updateStrapi(data);
            }else if(this.lastAddress === false){
                this.postStrapi(data);
            }
        },
        async postStrapi(data){
            const respuesta = await this.$store.dispatch('checkout/setAddress', data). then(res => {
                if(res.status == 200){
                    this.$router.push('/account/addresses');
                }
            }).catch(error => {
                // alert('hubo un error')
                this.$notify({
                    group: 'all',
                    title: 'Error',
                    text: `Hubo un error`
                });

            })
        },
        async updateStrapi(data){
            if(this.addId !== false){
                const setData = {
                    addId: this.addId,
                    data: data
                }
                const respuesta = await this.$store.dispatch('checkout/updateAddress', setData). then(res => {
                    if(res.status == 200){
                        this.$router.push('/account/addresses');
                    }
                }).catch(error => {
                    // alert('hubo un error')
                    this.$notify({
                        group: 'all',
                        title: 'Error',
                        text: `Hubo un error`
                    });
                })
            }else{
                // alert('hubo un error')
                this.$notify({
                    group: 'all',
                    title: 'Error',
                    text: `Hubo un error`
                });
            }
        },

    }
}
</script>
