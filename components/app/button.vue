<template>
  <button
    :type="btnType"
    class="w-full text-center inline-block px-[45px] py-[15px] text-base border-transparent rounded-sm bg-yellow-300 transition ease cursor-pointer hover:bg-yellow-500 active:bg-yellow-500"
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
