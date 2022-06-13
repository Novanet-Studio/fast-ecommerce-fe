<template>
  <section class="ps-page--my-account">
    <bread-crumb :breadcrumb="breadCrumb" />
    <shopping-cart-content />
  </section>
</template>

<script lang="ts" setup>
// import { useCart } from '~/store/cart';
// import { useProduct } from '~/store/product';

definePageMeta({
  layout: 'layout-account',
  // TODO: Search documentation for transition in Nuxt3
  // transition: 'zoom',
});

// const cart = useCart();
// const product = useProduct();

const breadCrumb = ref([
  {
    text: 'Inicio',
    url: '/'
  },
  {
    text: 'Carrito de compra'
  }
]);

// TODO: Move this function to store file
// const loadCartProducts = async () => {
//   const itemsId = cart.cartItems.map((item) => item.id);

//   if (itemsId.length) {
//     await product.getCartProducts(itemsId);
//   }
// }

// onMounted(async () => {
//   await loadCartProducts();
// });

</script>
