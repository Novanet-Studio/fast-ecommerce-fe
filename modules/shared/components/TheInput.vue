<template>
  <div class="py-3 pt-2 first:mb-4" :class="class">
    <input class="w-full border border-gray-300 p-4 focus:border-yellow-400 outline-transparent"
      :class="isError && 'border-red-500'" :type="type" v-model="value" :placeholder="placeholder" height="50">
    <div v-if="isError && errorMessage" class="text-sm pt-3 text-red-500">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: string;
  placeholder?: string;
  isError?: boolean | undefined;
  errorMessage?: string | undefined;
  class?: string | undefined;
  type?: 'text' | 'password' | 'email';
}

type Emits = {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const emits = defineEmits<Emits>();
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emits('update:modelValue', val),
});
</script>