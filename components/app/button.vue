<template>
  <button :type="type" :class="classes" @click.prevent="$emit('click')" :disabled="disabled" ref="$ref">
    <app-loader v-if="loading" />
    <slot v-else />
  </button>
</template>

<script lang="ts" setup>
type Props = {
  type?: 'submit' | 'button';
  class?: string;
  disabled?: boolean;
  outline?: boolean;
  loading?: boolean;
};

type Emits = {
  (e: 'click'): void;
};

const props = withDefaults(defineProps<Props>(), {
  type: 'button',
});

const classes = computed(() => {
  if (props.outline) {
    return `btn btn-outline ${props.class && props.class}`;
  }

  return `btn ${props.class && props.class}`;
});

defineEmits<Emits>();

const $ref = ref(null);

defineExpose({
  $ref,
});
</script>

<style>
.btn {
  @apply w-full text-center text-color-2 font-bold py-4 inline-block text-sm border-transparent rounded-md bg-color-1 transition ease cursor-pointer hover: (bg-opacity-80) active:(bg-opacity-80) disabled:(opacity-70 text-gray cursor-not-allowed);
}

.btn--outline {
  @apply flex justify-center border !bg-transparent rounded-md border-color-2 text-color-2 hover: ( !bg-color-2 !border-transparent !text-white);
}
</style>
