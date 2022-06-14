<template lang="html">
    <div class="ps-form__billing-info">
        <h3 class="ps-form__heading">
            Información de contacto
        </h3>
        <form action >

            <div class="form-group">
                <label>Email<sup>*</sup></label>
                <v-text-field
                    v-model="email"
                    placeholder="Email"
                    :error-messages="emailErrors"
                    @input="$v.email.$touch()"
                    outlined
                    height="50"
                />
            </div>
            <!-- <div class="form-group">
                <v-checkbox
                    color="success"
                    label="Quiero recibir más ofertas?"
                />
            </div> -->
            <h3 class="ps-form__heading">
                Informacion de envio
            </h3>
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Nombre</label>
                        <v-text-field
                            v-model="name"
                            placeholder="Nombre"
                            :error-messages="nameErrors"
                            @input="$v.name.$touch()"
                            outlined
                            height="50"
                        />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Apellido</label>
                        <v-text-field
                            v-model="lastName"
                            placeholder="Apellido"
                            :error-messages="lastNameErrors"
                            @input="$v.lastName.$touch()"
                            outlined
                            height="50"
                        />
                    </div>
                </div>
            </div>
            <div class="form-group">
                <label>Dirección</label>
                <v-text-field
                    v-model="address"
                    placeholder="Dirección" 
                    :error-messages="addressErrors"
                    @input="$v.address.$touch()"
                    outlined height="50" 
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
            <div class="row">
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Ciudad</label>
                        <v-text-field 
                            v-model="city"
                            placeholder="Ciudad" 
                            :error-messages="cityErrors"
                            @input="$v.city.$touch()"
                            outlined 
                            height="50" 
                        />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Codigo Postal</label>
                        <v-text-field
                            v-model="zipCode"
                            placeholder="Codigo Postal"
                            :error-messages="zipCodeErrors"
                            @input="$v.zipCode.$touch()"
                            outlined
                            height="50"
                        />
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="form-group">
                        <label>Numero de contacto</label>
                        <v-text-field
                            v-model="phone"
                            placeholder="Numero de contacto"
                            :error-messages="phoneErrors"
                            @input="$v.phone.$touch()"
                            outlined
                            height="50"
                        />
                    </div>
                </div>
            </div>
            <!-- <div class="form-group">
                <v-checkbox
                    color="success"
                    label="Guardar esta información"
                />
            </div> -->
            <div class="ps-form__submit">
                <!-- <nuxt-link to="/account/shopping-cart">
                    <i class="icon-arrow-left mr-1"></i>
                    Regresar al carrito de compra
                </nuxt-link> -->
                <div class="ps-block__footer">
                    <button class="ps-btn" @click.prevent="handleToShipping">
                        Continuar
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

export default {
    name: 'FormCheckoutInformation',
    computed: {
        user(){
            return this.$cookies.get('auth').user;
        },
        emailErrors(){
            const errors = [];
            if(this.email){
                if (!this.$v.email.$dirty) return errors;
                !this.$v.email.required && errors.push('This field is required');
                return errors;
            }
        },
        nameErrors(){
            const errors = [];
            if(this.name){
                if (!this.$v.name.$dirty) return errors;
                !this.$v.name.required && errors.push('This field is required');
                return errors;
            }
        },
        lastNameErrors(){
            const errors = [];
            if(this.lastName){
                if (!this.$v.lastName.$dirty) return errors;
                !this.$v.lastName.required && errors.push('This field is required');
                return errors;
            }
        },
        addressErrors(){
            const errors = [];
            if(this.address){
                if (!this.$v.address.$dirty) return errors;
                !this.$v.address.required && errors.push('This field is required');
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
        cityErrors(){
            const errors = [];
            if(this.city){
                if (!this.$v.city.$dirty) return errors;
                !this.$v.city.required && errors.push('This field is required');
                return errors;
            }
        },
        zipCodeErrors(){
            const errors = [];
            if(this.zipCode){
                if (!this.$v.zipCode.$dirty) return errors;
                !this.$v.zipCode.required && errors.push('This field is required');
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

    },
    data() {
        return{
            name: null,
            lastName: null,
            email: null,
            address: null,
            home: null,
            city: null,
            zipCode: null,
            phone: null
        }
    },
    validations: {
        email: { required },
        lastName: { required },
        name: { required },
        address: { required },
        home: { required },
        city: { required },
        zipCode: { required },
        phone: {required}
    },
    async mounted(){
        this.formInfoCookie()
        // this.hasShipping()

    },

    methods: {
        async handleToShipping() {
            // this.$v.$touch();
            if (!this.$v.$invalid) {
                const data = {
                    email: this.email,
                    name: this.name,
                    lastName: this.lastName,
                    address: this.address,
                    home: this.home,
                    city: this.city,
                    zipCode: this.zipCode,
                    phone: this.phone
                }
                this.$store.dispatch('checkout/shippingInfo', data)

                // console.log(this.$cookies.get('shippingInfo'))
                this.$router.push('/account/shipping');

            }
            // else{
            //     alert('todos los campos son obligatorios')
            // }
        },

        async formInfoCookie(){
            const data = this.$cookies.get('shippingInfo');
            if(typeof data !== 'undefined'){
                if(data.hasOwnProperty('email')){
                    this.address = data.address;
                    this.city = data.city;
                    this.email = data.email;
                    this.home = data.home;
                    this.lastName = data.lastName;
                    this.name = data.name;
                    this.zipCode = data.zipCode;
                    this.phone = data.phone; 
                }
                console.log('==> ship', data)
            }else{
                console.log('llamar funcion en strapi para la direccion')
                this.hasShipping()
            }
        },
        async hasShipping(){
            const type = 'shipping';
            const userId = this.user.id;

            const data = {
                userId: userId,
                type: type
            }

            await this.$store.dispatch('checkout/getAddress', data ).then(res => {
                if(res.length > 0){
                    const data = res[0].attributes.address;
                    this.address = `${data.pais} ${data.direccion}`;
                    this.city = data.estado;
                    this.zipCode = data.zipcode;
                    this.phone = data.telefono; 
                }
            }).catch(error => {
                console.log('error address', error)
            })
        }
    }
};
</script>

<style lang="scss" scoped></style>
