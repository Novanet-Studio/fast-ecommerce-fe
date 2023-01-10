<template>
  <div class="wishlist">
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
            <template v-for="parentItem in product.wishlistItems">
              <tr
                v-for="productItem in parentItem.data.products.data"
                :key="productItem.id"
              >
                <td class="w-table__td-product">
                  <product-shopping-cart :product="productItem" />
                </td>
                <td class="w-table__td-price">
                  $ {{ productItem.attributes.price.toFixed(2) }}
                </td>
                <td class="w-table__td-action">
                  <button class="w-table__action-btn">Añadir al carrito</button>
                  <a
                    href="#"
                    class="w-table__action-delete"
                    @click.prevent="handleRemoveItemFromWishlist(productItem)"
                  >
                    <i class="icon-cross"></i>
                  </a>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

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
    text: `${product.attributes.name} ha sido eliminado de la lista de deseos!`,
  });
};

const loadWishlist = async () => {
  if (!wishlist.items.length) {
    product.wishlistItems = null;
    return;
  }

  const itemsId = wishlist.items.map((item) => item.id);
  const wishlistPromises = itemsId.map((id: string) =>
    graphql<ProductsResponse>(GetProductById, { id })
  );

  const response = await Promise.all(wishlistPromises);

  product.wishlistItems = response;
};

onMounted(() => {
  loadWishlist();
});
</script>

<style lang="scss" scoped>
.price {
  text-align: center;
  margin: 0 auto;
}
</style>
