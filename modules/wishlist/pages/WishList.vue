<template>
  <section class="ps-page--my-account">
    <bread-crumb :breadcrumb="breadCrumb" />
    <wish-list-content />
  </section>
</template>

<script lang="ts" setup>
import { useWishList } from '~/store/wishlist';
import { useProduct } from '~/store/product';

definePageMeta({
  layout: 'layout-account',
  pageTransition: {
    // TODO: add zoom transition
  },
});

const wishlist = useWishList();
const product = useProduct();

const breadCrumb = ref([
  {
    text: 'Inicio',
    url: '/',
  },
  {
    text: 'List de deseos',
  }
]);

onMounted(async () => {
  const itemsId = wishlist.items.map((item) => item.id);

  if (itemsId.length) {
    await product.wishlistItems(itemsId);
  }
});
</script>
