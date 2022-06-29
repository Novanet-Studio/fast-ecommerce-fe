<template>
    <div class="pagoMovil--contenedor">
        <div class="ps-block__content">
            <strong>Venmo Datos</strong>
            <figure class="ps-block__items">
                Nombre: un nombre.
                <br>
                correo: correo@correo.com
                <br>
                motivo: Pago farine
            </figure>
            <figure>
                <figcaption>
                    <strong>Subtotal</strong>
                    <small>$ {{ amount }}</small>
                </figcaption>
            </figure>
        </div>
       <form id="pagomovil-form">
            <div class="form-group">
                <label> Nombre del usuario <sup>*</sup> </label>
                <v-text-field
                    v-model="name"
                    placeholder="Nombre del titular de la cuenta"
                    :error-messages="nameErrors"
                    @input="$v.name.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Payment ID <sup>*</sup> </label>
                <v-text-field
                    v-model="paymentVenmoId"
                    placeholder="numero de confirmacion"
                    :error-messages="paymentVenmoIdErrors"
                    @input="$v.paymentVenmoId.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Monto del pago en $USD<sup>*</sup> </label>
                <v-text-field
                    v-model="amountPayed"
                    placeholder="Monto del pago"
                    type="number"
                    :error-messages="amountPayedErrors"
                    @input="$v.amountPayed.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Fecha del pago <sup>*</sup> </label>
                <v-text-field
                    v-model="date"
                    type="date"
                    placeholder="Fecha del pago"
                    :error-messages="dateErrors"
                    @input="$v.date.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <p>
                    By making this purchase you agree to
                    <a href="#" class="highlight">our terms and conditions</a>.
                </p>
                <button class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleTransBofa"
                    id="card-button"
                    type="button"
                >
                    <p v-if="!loading" class="btn-pagar">Enviar Datos</p>
                    <p v-else>...</p>
                </button>

            </div>
       </form>
    </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

    export default {
        name: 'VenmoPayment',
        data(){
            return {
                name: null, 
                amountPayed: null, 
                paymentVenmoId: null,
                date: null,  
                loading: false, 
            }
        }, 
        computed: {
            amount(){
                let amount = (parseInt(this.$cookies.get('cart').amount))
                return amount
            },
            nameErrors(){
                const errors = [];
                if(!this.name){
                    if (!this.$v.name.$dirty) return errors;
                    !this.$v.name.required && errors.push('This field is required');
                    return errors;
                }
            },
            paymentVenmoIdErrors(){
                const errors = [];
                if(!this.paymentVenmoId){
                    if (!this.$v.paymentVenmoId.$dirty) return errors;
                    !this.$v.paymentVenmoId.required && errors.push('This field is required');
                    return errors;
                }
            },
            dateErrors(){
                const errors = [];
                if(!this.date){
                    if (!this.$v.date.$dirty) return errors;
                    !this.$v.date.required && errors.push('This field is required');
                    return errors;
                }
            },
            amountPayedErrors(){
                const errors = [];
                if(!this.amountPayed){
                    if (!this.$v.amountPayed.$dirty) return errors;
                    !this.$v.amountPayed.required && errors.push('This field is required');
                    return errors;
                }
            },
            
        },
        validations: {
            name: {required},
            paymentVenmoId: { required }, 
            date: { required },
            amountPayed: {required}
        },
        mounted(){
        },
        methods: {
            handleTransBofa(){
                this.$v.$touch();
                if (!this.$v.$invalid) {

                    var dataPayment = {
                        nombre: this.name,
                        venmo_payment_id: this.paymentVenmoId, 
                        monto: this.amountPayed,
                        fecha: this.date, 
                    }

                    console.log(dataPayment)
                    //** PRIMERO ENVIAR A STRAPI EL PAGO MOVIL*/

                    //** MANDAR CORREO DE QUE ESTA EN PROCESO DE APROBACION */

                    //** MANDAR EL INVOICE CON EL STATUS DE NO PAGADO */

                    
                }

            }
        }
    }
</script>

<style lang="scss" scoped>
.pagoMovil--contenedor{
    .ps-block__content{
        strong{
            color: #e36d65;
        }
    }

}
</style>