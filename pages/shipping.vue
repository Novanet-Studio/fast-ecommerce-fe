<template>
  <section>
    <!-- <bread-crumb :breadcrumb="breadcrumb" /> -->
    <shipping-content />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authentication',
  pageTransition: {
    name: 'zoom',
  },
  layoutTransition: {
    name: 'zoom',
  },
});

// const breadcrumb = ref([
//   {
//     text: 'Home',
//     url: '/',
//   },
//   {
//     text: 'Shopping Cart',
//     url: '/shopping-cart',
//   },
//   {
//     text: 'Shipping',
//   },
// ]);
</script>
