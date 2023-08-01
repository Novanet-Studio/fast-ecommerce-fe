<template>
  <wishlist-wrapper>
    <wishlist-header>Lista de deseos</wishlist-header>
    <wishlist-header no-articles v-if="!productStore.wishlistItems">
      No tienes articulos en tu lista de deseos
    </wishlist-header>
    <wishlist-table @reload="loadWishlist" />
  </wishlist-wrapper>
</template>

<script lang="ts" setup>
import { GetProductById } from '~/graphql/queries';

definePageMeta({
  layout: 'account',
});

const graphql = useStrapiGraphQL();
const wishlist = useWishlistStore();
const productStore = useProductStore();

const loadWishlist = async () => {
  const temp: any[] = [];

  if (!wishlist?.items?.length) {
    productStore.wishlistItems = null;
    return;
  }

  const itemsId = wishlist.items.map((item) => item.id);
  const wishlistPromises = itemsId.map((id: string) =>
    graphql<ProductRequest>(GetProductById, { id })
  );

  const response = await Promise.all(wishlistPromises);

  mapperData<any[]>(response).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.wishlistItems = temp;
};

onMounted(() => {
  loadWishlist();
});
</script>
