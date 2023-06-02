<template>
  <app-modal v-model="active">
    <div class="product-modal">
      <a class="product-modal__icon" @click="active = false">
        <ph-x weight="light" />
      </a>
      <slot />
      <!-- <product-quick-view :product="product" /> -->
    </div>
  </app-modal>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const props = defineProps<{ modelValue: boolean }>();

const active = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
