<template>
  <div class="ps-section--shopping ps-whishlist">
    <div class="container">
      <div class="ps-section__header">
        <h1>Lista de deseos</h1>
      </div>
      <div v-if="!product.wishlistItems" class="ps-section__content">
        <div class="table-responsive container">
          <h3>No tienes articulos en tu lista de deseos</h3>
        </div>
      </div>
      <div v-else class="ps-section__content">
        <div class="table-responsive">
          <table class="table ps-table--whishlist">
            <thead>
              <tr>
                <th></th>
                <th>Nombre</th>
                <th>Precio por unidad</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="productItem in product.wishlistItems" :key="productItem.id">
                <td>
                  <a href="#" @click.prevent="handleRemoveItemFromWishlist(productItem)">
                    <i class="icon-cross"></i>
                  </a>
                </td>
                <td>
                  <product-shopping-cart :product="productItem" />
                </td>
                <td class="price">
                  $ {{ productItem.attributes.price.toFixed(2) }}
                </td>
                <td>
                  <a class="ps-btn" href="#" @click.prevent="handleAddToCart(productItem)">
                    Añadir al carrito
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useWishList } from '~/store/wishlist';
import { useProduct } from '~/store/product';
import { useCart } from '~/store/cart';

const { $notify } = useNuxtApp();
const wishlist = useWishList();
const product = useProduct();
const cart = useCart();

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
    text: `${product.attributes.name} ha sido agregado al carrito!`
  });

}

const loadWishlist = async () => {
  if (!wishlist.items.length) {
    product.wishlistItems = false;
    return;
  }

  const itemsId = wishlist.items.map((item) => item.id);

  if (itemsId.length) {
    await product.getWishlishtProducts(itemsId);
  }
}

const handleRemoveItemFromWishlist = (product: any) => {
  wishlist.removeItemFromWishlist(product);
  loadWishlist();
  $notify({
    group: 'all',
    title: 'Eliminado',
    text: `${product.attributes.name} ha sido eliminado de la lista de deseos!`
  });
}

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
