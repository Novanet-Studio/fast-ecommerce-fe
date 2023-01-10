<template>
  <button
    :type="btnType"
    class="btn"
    :class="class"
    @click.prevent="$emit('click')"
    :disabled="disabled"
    ref="$ref"
  >
    <template v-if="text">
      {{ text }}
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<script lang="ts" setup>
type Props = {
  text?: string;
  btnType?: 'submit' | 'button';
  // TODO: implement variants
  type?: 'primary' | 'secundary' | 'dark' | 'light' | 'outline';
  class?: string;
  disabled?: boolean;
};

type Emits = {
  (e: 'click'): void;
};

withDefaults(defineProps<Props>(), {
  btnType: 'button',
  type: 'primary',
});

defineEmits<Emits>();

const $ref = ref(null);

defineExpose({
  $ref,
});
</script>
