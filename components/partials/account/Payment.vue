<template lang="html">
    <div class="ps-checkout ps-section--shopping">
        <notify/>

        <div class="container">
            <div class="ps-section__header">
                <h1>Método de pago</h1>
            </div>
            <div class="ps-section__content">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div class="ps-block--shipping">
                            <div class="ps-block__panel">
                                <figure>
                                    <small>Contacto</small>
                                    <p>{{email}}</p>
                                    <nuxt-link to="/account/checkout">
                                        <a>Cambiar</a>
                                    </nuxt-link>
                                </figure>
                                <figure>
                                    <small>Enviar a</small>
                                    <p>
                                        {{ fullAddress }}
                                    </p>
                                    <nuxt-link to="/account/checkout">
                                        <a>Cambiar</a>
                                    </nuxt-link>
                                </figure>
                            </div>
                            <!-- <h4>Shipping Method</h4>
                            <div class="ps-block__panel">
                                <figure>
                                    <small>
                                        International Shipping
                                    </small>
                                    <strong>$20.00</strong>
                                </figure>
                            </div> -->
                            <h4>Selecciona el método de pago</h4>
                            <payment-methods />
                            <div class="ps-block__footer">
                                <nuxt-link to="/account/shipping">
                                    <i class="icon-arrow-left mr-2"></i>
                                    Regresar a Información de envío
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 ">
                        <module-order-summary :shipping="true" />
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Notify from '~/components/elements/commons/notify';
import ModuleOrderSummary from '~/components/partials/account/modules/ModuleOrderSummary';
import PaymentMethods from '~/components/partials/account/modules/PaymentMethods';
export default {
    name: 'Payment',
    components: {Notify, PaymentMethods, ModuleOrderSummary },
    computed: {
        cookie(){
            const cookieInfo = this.$cookies.get('shippingInfo', { parseJSON: true });
            return cookieInfo;
        },
        email(){
            return this.cookie.email
        },
        fullAddress(){
            const direccion = `${this.cookie.address}, ${this.cookie.city}, ${this.cookie.zipCode}`
            return direccion; 
        }
    },


};
</script>

<style lang="scss" scoped></style>
