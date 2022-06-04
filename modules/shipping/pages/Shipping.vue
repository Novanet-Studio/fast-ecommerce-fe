<template>
  <div>
    <!-- <header-default /> -->
    <section class="ps-page--my-account">
      <bread-crumb :breadcrumb="breadcrumb" />
      <shipping-content />
    </section>
    <!-- <footer-fullwidth /> -->
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  // middleware: 'authentication'
  // transition: 'zoom',
});

const breadcrumb = ref([
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'Shopping Cart',
    url: '/shopping-cart'
  },
  {
    text: 'Shipping'
  }
]);
</script>
