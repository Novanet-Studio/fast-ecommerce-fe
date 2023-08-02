<script lang="ts" setup>
import { Tabs as VueTabs, Tab as VueTab } from 'vue3-tabs-component';
import PagoMovil from './pago-movil.vue';
import Paypal from './paypal.vue';
import TransBofa from './trans-bofa.vue';
import Venmo from './venmo.vue';
import Visa from './visa.vue';
import Zelle from './zelle.vue';

const tabs = [
  {
    name: 'Square Up',
    component: Visa,
  },
  {
    name: 'Paypal',
    component: Paypal,
  },
  {
    name: 'Pago movil',
    component: PagoMovil,
  },
  {
    name: 'Trans BoFa',
    component: TransBofa,
  },
  {
    name: 'Venmo',
    component: Venmo,
  },
  {
    name: 'Zelle',
    component: Zelle
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
