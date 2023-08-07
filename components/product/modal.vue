<script lang="ts" setup>
const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const props = defineProps<{ modelValue: boolean }>();

const active = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>

<template>
  <app-modal v-model="active">
    <div class="product-modal">
      <a class="product-modal__icon" @click="active = false">
        <div class="i-ph-x-light" />
      </a>
      <slot />
    </div>
  </app-modal>
</template>

<style scoped>
.product-modal {
  @apply p-4 relative lg:p-6;
}

.product-modal__icon {
  @apply absolute top-3 right-4 cursor-pointer;
}
</style>
