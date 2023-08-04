<script setup>
definePageMeta({
  layout: 'account',
});

const wishlist = useWishlistStore();
const productStore = useProductStore();

onMounted(() => {
  wishlist.load();
});
</script>


<template>
  <wishlist-wrapper>
    <wishlist-header>Lista de deseos</wishlist-header>
    <wishlist-header no-articles v-if="!productStore?.wishlistItems?.length">
      No tienes articulos en tu lista de deseos
    </wishlist-header>
    <wishlist-table @reload="wishlist.load" v-else />
  </wishlist-wrapper>
</template>
