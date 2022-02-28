<template lang="html">
    <div class="ps-checkout ps-section--shopping">
        <div class="container">
            <div class="ps-section__header">
                <h1>Checkout Information</h1>
            </div>
            <div class="ps-section__content">
                <div class="ps-form--checkout">
                    <div class="ps-form__content">
                        <div class="row">
                            <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <form-checkout-information />
                            </div>
                            <div
                                class="col-xl-4 col-lg-4 col-md-12 col-sm-12  "
                            >
                                <module-order-summary />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import FormCheckoutInformation from '~/components/partials/account/modules/FormCheckoutInformation';
import ModuleOrderSummary from '~/components/partials/account/modules/ModuleOrderSummary';
export default {
    name: 'Checkout',
    components: { ModuleOrderSummary, FormCheckoutInformation }
};
</script>

<style lang="scss" scoped></style>
