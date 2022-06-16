<template>
  <div class="mt-8 max-w-sm sm:(max-w-lg mb-24) lg:(px-7 mt-0 max-w-full)">
    <div class="w-full px-3 mx-auto">
      <div class="pb-12 text-center lg:pb-24">
        <h1 class="text-3xl font-semibold text-yellow-400 lg:text-5xl">Lista de deseos</h1>
      </div>
      <div v-if="!product.wishlistItems">
        <div class="w-full px-3 mx-auto">
          <h3 class="text-xl text-yellow-400 mb-2 font-bold lg:text-2xl">No tienes articulos en tu lista de deseos</h3>
        </div>
      </div>
      <div v-else class="overflow-auto">
        <div>
          <table class="w-full border-collapse border-collapse mb-4 text-dark-300">
            <thead class="align-bottom col-span-12">
              <tr class="border-current border-solid border-0">
                <th
                  class="border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-[#e36d65] align-middle text-center font-semibold text-sm">
                  Nombre</th>
                <th
                  class="border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-[#e36d65] text-center py-3 font-semibold text-sm">
                  Precio por unidad</th>
                <th
                  class="border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-[#e36d65] text-center font-semibold text-sm align-middle">

                </th>
              </tr>
            </thead>
            <tbody>
              <template v-for="parentItem in product.wishlistItems">
                <tr v-for="productItem in parentItem.data.products.data" :key="productItem.id">
                  <td class="min-w-[200px] px-[10px] py-[30px] lg:(align-middle)">
                    <product-shopping-cart :product="productItem" />
                  </td>
                  <td class="min-w-[200px] px-[10px] py-[30px] align-middle text-center lg:w-40">
                    $ {{ productItem.attributes.price.toFixed(2) }}
                  </td>
                  <td class="min-w-[300px] px-[10px] py-[30px] lg:w-[35%]">
                    <button
                      class="inline-block px-8 py-3 rounded-sm transition ease bg-yellow-400 text-white active:bg-yellow-500 hover:bg-yellow-500">
                      Añadir al carrito
                    </button>
                    <a href="#" class="ml-4 text-red-700" @click.prevent="handleRemoveItemFromWishlist(productItem)">
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
  </div>
</template>

<script lang="ts" setup>
import { GetProductById } from '~/modules/product/queries';

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
    text: `${product.attributes.name} ha sido agregado al carrito!`
  });

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

const loadWishlist = async () => {
  if (!wishlist.items.length) {
    product.wishlistItems = null;
    return;
  }

  const itemsId = wishlist.items.map((item) => item.id);
  const wishlistPromises = itemsId.map((id: string) => graphql<ProductsResponse>(GetProductById, { id }));

  const response = await Promise.all(wishlistPromises);

  product.wishlistItems = response;
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
