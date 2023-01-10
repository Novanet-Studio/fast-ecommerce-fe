<template>
  <section class="shopping-cart">
    <!-- <bread-crumb :breadcrumb="breadCrumb" /> -->
    <shopping-cart-content />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  layoutTransition: {
    name: 'zoom',
  },
  pageTransition: {
    name: 'zoom',
  },
});

// const breadCrumb = ref([
//   {
//     text: 'Inicio',
//     url: '/',
//   },
//   {
//     text: 'Carrito de compra',
//   },
// ]);
</script>
