<template lang="html">
    <div class="ps-checkout ps-section--shopping">
        <div class="container">
            <div class="ps-section__header">
                <h1>Payment</h1>
            </div>
            <div class="ps-section__content">
                <div class="row">
                    <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                        <div class="ps-block--shipping">
                            <div class="ps-block__panel">
                                <figure>
                                    <small>Contact</small>
                                    <p>test@gmail.com</p>
                                    <nuxt-link to="/account/checkout">
                                        <a>Change</a>
                                    </nuxt-link>
                                </figure>
                                <figure>
                                    <small>Ship to</small>
                                    <p>
                                        2015 South Street, Midland, Texas
                                    </p>
                                    <nuxt-link to="/account/checkout">
                                        <a>Change</a>
                                    </nuxt-link>
                                </figure>
                            </div>
                            <h4>Shipping Method</h4>
                            <div class="ps-block__panel">
                                <figure>
                                    <small>
                                        International Shipping
                                    </small>
                                    <strong>$20.00</strong>
                                </figure>
                            </div>
                            <h4>Payment Methods</h4>
                            <payment-methods />
                            <div class="ps-block__footer">
                                <nuxt-link to="/account/shipping">
                                    <i class="icon-arrow-left mr-2"></i>
                                    Return to shipping
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
import ModuleOrderSummary from '~/components/partials/account/modules/ModuleOrderSummary';
import PaymentMethods from '~/components/partials/account/modules/PaymentMethods';
export default {
    name: 'Payment',
    components: { PaymentMethods, ModuleOrderSummary }
};
</script>

<style lang="scss" scoped></style>
