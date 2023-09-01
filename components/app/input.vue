<script lang="ts" setup>
import { useField } from 'vee-validate';

type Props = {
  name: string;
  placeholder?: string;
  class?: string;
  type?: 'text' | 'password' | 'email' | 'date';
};

const focus = ref(false);

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
});

const { value, errorMessage } = useField(() => props.name);
</script>

<template>
  <div class="input-group" :class="class">
    <div
      class="flex items-center border p-4 rounded-md"
      :class="[
        errorMessage?.length && 'border-red-5',
        focus && 'border-[#e36d65]',
      ]"
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
    <div class="text-xs pt-1 text-red-500" v-if="errorMessage?.length">
      {{ errorMessage }}
    </div>
  </div>
</template>
