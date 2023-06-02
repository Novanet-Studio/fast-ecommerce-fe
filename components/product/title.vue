<template>
  <nuxt-link :to="`/product/${id}`" class="title">
    <slot />
  </nuxt-link>
</template>

<script lang="ts" setup>
defineProps<{ id: string }>();
</script>

<style scoped>
.title {
  @apply m-0 block text-sm pt-2 pb-1 pl-0 overflow-hidden pr-4 text-color-6;
}
</style>
