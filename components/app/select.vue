<template>
  <div class="input-group" :class="class">
    <div
      class="flex items-center border p-4 rounded-md"
      :class="[error && 'input--error', focus && 'border-yellow-400']"
    >
      <div class="flex-0 mr-3" v-if="$slots.left">
        <slot name="left" />
      </div>
      <select
        class="flex-1 outline-none !bg-transparent"
        v-model="value"
        @focus="focus = true"
        @blur="focus = false"
        :placeholder="placeholder"
        height="50"
      >
        <option class="form-control" selected disabled v-if="defaultMessage">
          <!-- -- Selecciona un pais -- -->
          {{ defaultMessage }}
        </option>
      </select>
      <div v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
    <div class="">
      <div class="text-xs pt-1 text-red-500" v-if="error && errorMessage">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: string;
  placeholder?: string;
  error?: boolean | undefined;
  errorMessage?: string | undefined;
  class?: string | undefined;
  defaultMessage?: string | undefined;
};

type Emits = {
  (e: 'update:modelValue', value: string): void;
};

const focus = ref(false);

const props = withDefaults(defineProps<Props>(), {
  error: false,
  type: 'text',
});

const emits = defineEmits<Emits>();
const value = computed({
  get: () => props.modelValue,
  set: (val: string) => emits('update:modelValue', val),
});
</script>

<style scoped></style>
