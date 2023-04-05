<template>
  <div class="input-group" :class="class">
    <input
      class="input"
      :class="isError && 'input--error'"
      :type="type"
      v-model="value"
      :placeholder="placeholder"
      height="50"
    />
    <div class="input__error" v-if="isError && errorMessage">
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
  type?: 'text' | 'password' | 'email' | 'date' | 'number';
};

type Emits = {
  (e: 'update:modelValue', value: string): void;
};

const props = withDefaults(defineProps<Props>(), {
  isError: false,
  type: 'text',
});

const emits = defineEmits<Emits>();
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emits('update:modelValue', val),
});
</script>
