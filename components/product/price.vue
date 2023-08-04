<script lang="ts" setup>
defineProps<{ class?: string }>();
</script>

<template>
  <p class="relative text-base text-color-2" :class="class">$
    <slot />
  </p>
</template>

