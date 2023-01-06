<template>
  <section>
    <!-- <bread-crumb :items="breadCrumb" /> -->
    <checkout-content />
  </section>
</template>

<script>
definePageMeta({
  middleware: 'authentication',
  pageTransition: {
    name: 'zoom'
  },
});

const breadCrumb = ref([
  {
    text: 'Inicio',
    url: '/'
  },
  {
    text: 'Carrito de compra',
    url: '/shopping-cart'
  },
  {
    text: 'Información de compra'
  }
]);

</script>
