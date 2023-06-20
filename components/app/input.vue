<template>
  <div class="input-group" :class="class">
    <div
      class="flex items-center border p-4 rounded-md"
      :class="[error && 'border-red-5', focus && 'border-[#e36d65]']"
    >
      <div class="mr-3" v-if="$slots.left">
        <slot name="left" />
      </div>
      <input
        class="w-4/5 md:w-full outline-none"
        :type="type"
        v-model="value"
        @focus="focus = true"
        @blur="focus = false"
        :placeholder="placeholder"
        height="50"
      />
      <div v-if="$slots.right">
        <slot name="right" />
      </div>
    </div>
    <div class="text-xs pt-1 text-red-500" v-if="error && errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  modelValue: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  class?: string;
  type?: 'text' | 'password' | 'email' | 'date';
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
