<template>
  <!-- ps-block--methods -->
  <div class="w-full">
    <Tabs :options="{ useUrlFragmet: false }">
      <tab name="Square up">
        <visa-method />
      </tab>
      <tab name="Zelle">
        Zelle data form goes here...
      </tab>
    </Tabs>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, Tab } from 'vue3-tabs-component';
type Methods = {
  text: string;
  enabled?: boolean;
  active?: boolean;
}

const methods: Methods[] = [
  {
    text: 'Square Up',
    enabled: true,
    active: true,
  },
  {
    text: 'Zelle',
    enabled: false,
    active: false,
  },
  {
    text: 'Pago móvil',
    enabled: false,
    active: false,
  },
  {
    text: 'Paypal',
    enabled: false,
    active: false,
  },
]
</script>

<style scoped>
:deep(.tabs-component) {
  /* @apply border; */
}

:deep(.tabs-component-tabs) {
  @apply flex gap-4;
}

:deep(.tabs-component-tab) {
  @apply p-4 border text-gray-400;
}

:deep(.is-active:not(a)) {
  @apply p-4 border border-yellow-500 text-yellow-500;
}

:deep(.is-disabled:not(a)) {
  @apply p-4 border border-yellow-500 text-yellow-500;
}

:deep(.tabs-component-panels) {
  @apply py-6;
}
</style>
