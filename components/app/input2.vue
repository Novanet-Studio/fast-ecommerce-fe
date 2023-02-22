<template>
  <div class="input-group" :class="class">
    <div
      class="flex items-center border p-4 rounded-md"
      :class="[error && 'input--error', focus && 'border-yellow-400']"
    >
      <div
        v-if="iconLeft"
        class="flex-0 mr-3"
        :class="
          typeof onClickLeftIcon !== 'undefined' && 'cursor-pointer group'
        "
        @click="onClickLeftIcon"
      >
        <font-awesome
          :icon="iconLeft"
          :size="iconSize"
          class="text-gray-400 transition group-hover:text-gray-500"
        />
      </div>
      <input
        class="flex-1 outline-transparent"
        :type="type"
        v-model="value"
        @focus="focus = true"
        @blur="focus = false"
        :placeholder="placeholder"
        height="50"
      />
      <div
        v-if="iconRight"
        :class="
          typeof onClickRightIcon !== 'undefined' && 'cursor-pointer group'
        "
        @click="onClickRightIcon"
      >
        <font-awesome
          :icon="iconRight"
          :size="iconSize"
          class="text-gray-400 transition group-hover:text-gray-500"
        />
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
  type?: 'text' | 'password' | 'email';
  iconLeft?: string;
  iconSize?: string;
  iconClass?: string;
  iconRight?: string;
  onClickRightIcon?: () => void;
  onClickLeftIcon?: () => void;
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
