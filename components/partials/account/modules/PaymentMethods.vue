<template lang="html">
    <div class="ps-block--methods">
        <v-tabs
            background-color="white"
            color="warning"
            class="ps-tab-list"
            grow
        >
            <v-tab tag="li" class="tab-label">
                Visa / Master Card
            </v-tab>
            <v-tab tag="li" class="tab-label">
                Paypal
            </v-tab>
            <v-tab-item>
                <form>
                    <div class="ps-block__content">
                        <visa-method />
                    </div>
                </form>
            </v-tab-item>
            <v-tab-item>
                <div class="ps-block__content">
                    <paypal-method />
                </div>
            </v-tab-item>
        </v-tabs>
    </div>
</template>

<script>
import PaypalMethod from '~/components/partials/account/modules/PaypalMethod';
import VisaMethod from '~/components/partials/account/modules/VisaMethod';
export default {
    name: 'PaymentMethods',
    components: { VisaMethod, PaypalMethod }
};
</script>

<style lang="scss" scoped>
.tab-label {
    font-size: 16px;
    text-transform: none;
    color: $color-1st;
}
</style>
