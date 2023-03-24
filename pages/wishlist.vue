<template>
  <section class="wishlist">
    <div class="wishlist__center">
      <header class="wishlist__header">
        <h1 class="wishlist__title">Lista de deseos</h1>
      </header>
      <div v-if="!product.wishlistItems">
        <header class="wishlist__center">
          <h3 class="wishlist__subtitle">
            No tienes articulos en tu lista de deseos
          </h3>
        </header>
      </div>
      <div v-else class="w-table-wrapper">
        <table class="w-table">
          <thead class="w-table__thead">
            <tr class="w-table__tr">
              <th class="w-table__th-name">Nombre</th>
              <th class="w-table__th-price">Precio por unidad</th>
              <th class="w-table__th-action"></th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in product.wishlistItems" :key="item.id">
              <td class="w-table__td-product">
                <product-shopping-cart :product="item" />
              </td>
              <td class="w-table__td-price">$ {{ item.price.toFixed(2) }}</td>
              <td class="w-table__td-action">
                <button class="w-table__action-btn" @click="handleAddToCart">
                  Añadir al carrito
                </button>
                <a
                  href="#"
                  class="w-table__action-delete"
                  @click.prevent="handleRemoveItemFromWishlist(item)"
                >
                  <i class="icon-cross"></i>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  layout: 'layout-account',
  pageTransition: {
    name: 'page',
  },
});

const { $notify, $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const wishlist = $store.wishlist();
const product = $store.product();
const cart = $store.cart();

const handleAddToCart = (product: any) => {
  const item = {
    id: product.id,
    quantity: 1,
    price: product.attributes.price,
  };

  cart.addProductToCart(item);
  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.attributes.name} ha sido agregado al carrito!`,
  });
};

const handleRemoveItemFromWishlist = (product: any) => {
  wishlist.removeItemFromWishlist(product);
  loadWishlist();
  $notify({
    group: 'all',
    title: 'Eliminado',
    text: `${product.name} ha sido eliminado de la lista de deseos!`,
  });
};

const loadWishlist = async () => {
  const temp: any[] = [];

  if (!wishlist?.items?.length) {
    product.wishlistItems = null;
    return;
  }

  const itemsId = wishlist.items.map((item) => item.id);
  const wishlistPromises = itemsId.map((id: string) =>
    graphql<ProductsResponse>(GetProductById, { id })
  );

  const response = await Promise.all(wishlistPromises);

  mapperData<any[]>(response).forEach((item) => {
    temp.push(item.products[0]);
  });

  product.wishlistItems = temp;
};

onMounted(() => {
  loadWishlist();
});
</script>
