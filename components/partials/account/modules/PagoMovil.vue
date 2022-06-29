<template>
    <div class="pagoMovil--contenedor">
        <div class="ps-block__content">
            <strong>Pago movil Datos</strong>
            <figure class="ps-block__items">
                Banco: Banesco.
                <br>
                Numero de telefono: 04141112233.
                <br>
                rif: j-0975432826
            </figure>
            <figure>
                <figcaption>
                    <strong>Subtotal</strong>
                    <small>$ {{ amountRate }}</small>
                </figcaption>
            </figure>
        </div>
       <form id="pagomovil-form">
            <div class="form-group">
                <label> Numero de telefono <sup>*</sup> </label>
                <v-text-field
                    v-model="phone"
                    type="number"
                    placeholder="Numero de telefono"
                    :error-messages="phoneErrors"
                    @input="$v.phone.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Banco <sup>*</sup> </label>
                <v-text-field
                    v-model="bank"
                    placeholder="Nombre del banco"
                    :error-messages="bankErrors"
                    @input="$v.bank.$touch()"
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
                <label> Monto del pago en Bs<sup>*</sup> </label>
                 <p>
                    <b>La tasa del dia es de {{ rateBs }} BsD, El monto del pago debe ser de {{ amountRate }}</b>
                </p>
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
                <p>
                    By making this purchase you agree to
                    <a href="#" class="highlight">our terms and conditions</a>.
                </p>
                <button class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handlePagoMovil"
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
        name: 'PagoMovil',
        data(){
            return {
                phone: null, 
                amountPayed: null, 
                bank: null, 
                date: null,
                loading: false, 
                rateBs: 5500, 
            }
        }, 
        computed: {
            amountRate(){
                let amount = (this.rateBs * parseInt(this.$cookies.get('cart').amount))
                return amount
            },
            phoneErrors(){
                const errors = [];
                if(!this.phone){
                    if (!this.$v.phone.$dirty) return errors;
                    !this.$v.phone.required && errors.push('This field is required');
                    return errors;
                }
            },
            bankErrors(){
                const errors = [];
                if(!this.bank){
                    if (!this.$v.bank.$dirty) return errors;
                    !this.$v.bank.required && errors.push('This field is required');
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
            phone: {required},
            bank: { required }, 
            date: { required },
            amountPayed: { required }, 
        },
        mounted(){
        },
        methods: {
            handlePagoMovil(){
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    console.log(this.amountPayed, this.amountRate)
                    if(parseInt(this.amountPayed )!== this.amountRate){
                        this.$notify({
                            group: 'all',
                            title: 'Error!',
                            text: `El monto del pago debe ser de ${this.amountRate}!`
                        });
                    }else{
                        var dataPayment = {
                            telefono: this.phone,
                            banco: this.bank, 
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