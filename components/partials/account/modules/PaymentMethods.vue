<template lang="html">
    <div class="ps-block--methods">
        <v-tabs
            background-color="white"
            color="warning"
            class="ps-tab-list"
            grow
        >
          <v-tab tag="li" class="tab-label">
                Payment
            </v-tab>
            <v-tab-item>
                <div class="ps-block__content">
                    <VisaMethod />
                </div>
            </v-tab-item>

            <!-- <v-tab tag="li" class="tab-label">
                Visa / Master Card
            </v-tab>
            <v-tab tag="li" class="tab-label">
                Paypal
            </v-tab>
            <v-tab-item>
                <div class="ps-block__content">
                    <visa-method />
                </div>
            </v-tab-item>
            <v-tab-item>
                <div class="ps-block__content">
                    <paypal-method />
                </div>
            </v-tab-item> -->

        </v-tabs>
    </div>
</template>

<script>
import PaypalMethod from '~/components/partials/account/modules/PaypalMethod';
import VisaMethod from '~/components/partials/account/modules/VisaMethod';
import PaymentForm from '~/components/partials/account/modules/PaymentForm';
 
export default {
    name: 'PaymentMethods',
    components: { VisaMethod, PaypalMethod, PaymentForm },
    data() {
        return {
            checkout: false
        }
    },
    computed:{
        user(){
            return this.$cookies.get('auth').user
        },
    },

};
</script>

<style lang="scss" scoped>
.tab-label {
    font-size: 16px;
    text-transform: none;
    color: $color-1st;
}
</style>
