<template lang="html">
  <div class="ps-block--methods">
    <v-tabs background-color="white" color="warning" class="ps-tab-list" grow>
      <v-tab tag="li" class="tab-label">
        TDC / TDD
      </v-tab>
      <v-tab tag="li" class="tab-label">
        TRANS. BoFA
      </v-tab>
      <v-tab tag="li" class="tab-label">
        ZELLE
      </v-tab>
      <v-tab tag="li" class="tab-label">
        PAGO MOVIL
      </v-tab>
      <v-tab tag="li" class="tab-label">
        VENMO
      </v-tab>
      <v-tab tag="li" class="tab-label">
        PAYPAL
      </v-tab>
      <v-tab-item>
        <div class="ps-block__content">
          <VisaMethod />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="ps-block__content">
          <TransBofa />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="ps-block__content">
          <ZellePayment />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="ps-block__content">
          <PagoMovil />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="ps-block__content">
          <VenmoPayment />
        </div>
      </v-tab-item>
      <v-tab-item>
        <div class="ps-block__content">
          <PaypalMethod />
        </div>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
import PaypalMethod from "~/components/partials/account/modules/PaypalMethod";
import VisaMethod from "~/components/partials/account/modules/VisaMethod";
import PaymentForm from "~/components/partials/account/modules/PaymentForm";
import PagoMovil from "./PagoMovil";
import ZellePayment from "./ZellePayment";
import TransBofa from "./TransBofa";
import VenmoPayment from "./VenmoPayment";

export default {
  name: "PaymentMethods",
  components: {
    VisaMethod,
    PaypalMethod,
    PaymentForm,
    PagoMovil,
    ZellePayment,
    TransBofa,
    VenmoPayment,
  },
  data() {
    return {
      checkout: false,
    };
  },
  computed: {
    user() {
      return this.$cookies.get("auth").user;
    },
  },
};
</script>

<style lang="scss" scoped>
.tab-label {
  font-size: 12px;
  text-transform: none;
  color: $color-1st;
}

.v-tab--active {
  color: #e36d65;
  font-weight: 600;
}

</style>
