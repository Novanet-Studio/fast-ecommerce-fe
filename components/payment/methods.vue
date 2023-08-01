<script lang="ts" setup>
import { PaymentPagoMovil, PaymentPaypal, PaymentTransBofa, PaymentVenmo, PaymentVisa, PaymentZelle } from '.nuxt/components';
import { Tabs as VueTabs, Tab as VueTab } from 'vue3-tabs-component';

const tabs = [
  {
    name: 'Square Up',
    component: PaymentVisa,
  },
  {
    name: 'Paypal',
    component: PaymentPaypal,
  },
  {
    name: 'Pago movil',
    component: PaymentPagoMovil,
  },
  {
    name: 'Trans BoFa',
    component: PaymentTransBofa,
  },
  {
    name: 'Venmo',
    component: PaymentVenmo,
  },
  {
    name: 'Zelle',
    component: PaymentZelle
  }
]
</script>

<template>
  <div class="whitespace-nowrap md:w-full">
    <vue-tabs :options="{ useUrlFragmet: false }">
      <vue-tab v-for="(tab, i) in tabs" :key="i" :name="tab.name">
        <component :is="tab.component" />
      </vue-tab>
    </vue-tabs>
  </div>
</template>

<style scoped>
:deep(.tabs-component) {
  /* @apply border; */
}

:deep(.tabs-component-tabs) {
  @apply flex overflow-x-scroll w-30rem max-w-30rem md: (w-full max-w-full);
}

:deep(.tabs-component-tab) {
  @apply px-4 py-3 border-b text-gray-400 flex-1 text-center;
}

:deep(.is-active:not(a)) {
  @apply px-4 py-3 border-b-2 border-dark-1 text-color-2;
}

:deep(.is-disabled:not(a)) {
  @apply px-4 py-3 border-b-2 border-dark-1 text-color-2;
}

:deep(.tabs-component-panels) {
  @apply py-6;
}
</style>
