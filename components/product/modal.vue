<template>
  <app-modal v-model="active">
    <div class="product-modal">
      <a class="product-modal__icon" @click="active = false">
        <ph-x weight="light" />
      </a>
      <slot />
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

<style>
.product-modal {
  @apply p-4 relative lg:p-6;
}

.product-modal__icon {
  @apply absolute top-3 right-4 cursor-pointer;
}
</style>
