<template>
  <section class="shopping-cart">
    <!-- <bread-crumb :breadcrumb="breadCrumb" /> -->
    <shopping-cart-content />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  pageTransition: {
    name: 'page',
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
