<template>
  <GDialog v-model="active" max-width="900">
    <slot></slot>
  </GDialog>
</template>

<script lang="ts" setup>
import 'gitart-vue-dialog/dist/style.css';
import { GDialog } from 'gitart-vue-dialog';

const emit = defineEmits<{ (e: 'update:modelValue', value: boolean): void }>();
const props = defineProps<{ modelValue: boolean }>();

const active = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val),
});
</script>
