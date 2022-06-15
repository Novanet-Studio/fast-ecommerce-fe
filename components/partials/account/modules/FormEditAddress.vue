<template lang="html">
    <form class="ps-form--edit-address" >
        <div class="ps-form__header">
            <h3 v-if="tipo === 'add=bill'">Billing address</h3>
            <h3 v-else>Shipping address</h3>
        </div>
        <div class="ps-form__content">
            <!-- <div class="form-group">
                <label> Country <sup>*</sup> </label>
                <v-text-field
                    v-model="country"
                    placeholder="Pais"
                    :error-messages="countryErrors"
                    @input="$v.country.$touch()"
                    outlined
                    height="50"
                />
            </div> -->
            <div class="form-group">
                <label> Pais <sup>*</sup> </label>
                <select class="form-control" 
                    v-model="country"
                    placeholder="Pais"
                    :error-messages="countryErrors"
                    @input="$v.country.$touch()"
                    outlined
                    height="50"
                >
                    <option class="form-control" selected disabled>-- selecciona un pais --</option>
                    <option class="form-control" v-for="country in countries" :value="country.code">
                        {{ country.name }}
                    </option>
                </select>
            </div>
            <div class="form-group">
                <label> Dirección <sup>*</sup> </label>
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
                <label>Apartamento</label>
                <v-text-field
                    v-model="home"
                    placeholder="Apartamento, casa, etc."
                    :error-messages="homeErrors"
                    @input="$v.home.$touch()"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <label> Estado <sup>*</sup> </label>
                <v-text-field
                    v-model="state"
                    placeholder="Estado"
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
                    placeholder="codigo postal"
                    :error-messages="postcodeErrors"
                    @input="$v.postcode.$touch()"
                    outlined
                    height="50"
                />
            </div>
            <div class="form-group">
                <label> Numero Telefonico <sup>*</sup> </label>
                <v-text-field
                    v-model="phone"
                    placeholder="Numero de telefono"
                    :error-messages="phoneErrors"
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
import countries from '~/static/data/countries.json'; 

export default {
    props: ['tipo'],
    data(){
        return {
            country: null,
            strAdd: null,
            state: null,
            postcode: null,
            phone: null, 
            lastAddress: false,
            addId: false,
            selected: null,
            home: null, 
            countries: countries
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
        phoneErrors(){
            const errors = [];
            if(this.phone){
                if (!this.$v.phone.$dirty) return errors;
                !this.$v.phone.required && errors.push('This field is required');
                return errors;
            }
        },
        homeErrors(){
            const errors = [];
            if(this.home){
                if (!this.$v.home.$dirty) return errors;
                !this.$v.home.required && errors.push('This field is required');
                return errors;
            }
        },
    },
    validations: {
        country: { required },
        strAdd: { required },
        state: { required },
        postcode: { required },
        phone: {required},
        home: {required}
    },
    mounted(){
        console.log(this.country);
        console.log('====> esto',this.tipo)
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
                        zipcode: this.postcode,
                        telefono: this.phone,
                        aptm: this.home
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
            console.log('la funcion')
            const userId = this.user.id;
            const type = this.setType();
            if(type !== false){
                const data = {
                    userId: userId,
                    type: type
                }
                console.log('el tipo', type)
                const respuesta = await this.$store.dispatch('checkout/getAddress', data ).then(res=> {
                    console.log('respuesta de address ===>', res)
                    if(res.length > 0){
                        const address = res[0].attributes.address;
                        this.lastAddress = true; 
                        this.addId = res[0].id;
                        this.country = address.pais;
                        this.state = address.estado;
                        this.strAdd = address.direccion;
                        this.postcode = address.zipcode;
                        this.phone = address.telefono;
                        this.home = address.aptm;
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
                    this.$notify({
                        group: 'all',
                        title: 'Exito!',
                        text: `La direccion se ha guardado!`
                    });
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
                        this.$notify({
                            group: 'all',
                            title: 'Exito!',
                            text: `La direccion se ha actualizado!`
                        });                       
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
