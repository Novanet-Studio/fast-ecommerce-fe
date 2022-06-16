<template>
  <!-- ps-block--methods -->
  <div>
    <!-- TODO: implement tabs for others payments methods -->
    <div class="w-full">
      <ul class="flex gap-4 flex-[0_1_auto] relative transition ease whitespace-nowrap">
        <li v-for="(method, index) in methods" :key="index"
          class="flex-[1_0_auto] justify-center font-semibold flex cursor-pointer items-center content-center p-3 border text-sm transition ease md:(text-base min-w-[5.625rem] p-4)"
          :class="[method.active && method.enabled ? 'text-yellow-400 border-yellow-400 hover:(text-yellow-500 border-yellow-500)' : 'text-gray-200 border-gray-200', method.enabled ? 'cursor-pointer' : 'cursor-not-allowed']"
          :disabled="method.enabled">
          {{ method.text }}</li>
      </ul>
    </div>
    <div class="py-8">
      <visa-method />
    </div>
  </div>
</template>

<script lang="ts" setup>
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
