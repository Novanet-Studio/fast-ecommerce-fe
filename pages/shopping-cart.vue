<template>
  <section class="shopping-cart">
    <shopping-cart-content />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
});
</script>
