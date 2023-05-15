<template>
  <section class="wishlist">
    <div class="wishlist__center">
      <header class="wishlist__header">
        <h1 class="wishlist__title">Lista de deseos</h1>
      </header>
      <div v-if="!productStore.wishlistItems">
        <header class="wishlist__center">
          <h3 class="wishlist__subtitle">
            No tienes articulos en tu lista de deseos
          </h3>
        </header>
      </div>
      <div class="flex flex-col" v-else>
        <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
          <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
            <div
              class="overflow-hidden rounded-md shadow shadow-md shadow-gray-300"
            >
              <table class="min-w-full">
                <thead class="bg-yellow-200 border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                    >
                      Precio por unidad
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-bold text-color-7 px-6 py-4 text-left lg:text-base"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="bg-color-7 border-b transition duration-300 ease-in-out hover:bg-color-8 group"
                    v-for="item in productStore.wishlistItems"
                    :key="item.id"
                  >
                    <td
                      class="px-6 py-4 text-sm font-bold text-color-6 p-2 lg:text-base"
                    >
                      <product-shopping-cart
                        image-class="!h-24"
                        :product="item"
                      />
                    </td>
                    <td
                      class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                    >
                      $ {{ item.price.toFixed(2) }}
                    </td>
                    <td
                      class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base lg:flex items-center"
                    >
                      <app-button class="!w-48" @click="handleAddToCart(item)">
                        Añadir al carrito
                      </app-button>
                      <a
                        href="#"
                        class="w-table__action-delete"
                        @click.prevent="handleRemoveItemFromWishlist(item)"
                      >
                        <ph-x weight="light" />
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  layout: 'layout-account',
});

const { $notify, $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const wishlist = $store.wishlist();
const productStore = $store.product();
const cart = $store.cart();

const handleAddToCart = async (product: any) => {
  const item = {
    id: product.id,
    quantity: 1,
    price: product.price,
  };

  cart.addProductToCart(item);

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductsResponse>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  const temp: any[] = [];

  mapperData<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.addCartProducts(temp);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.name} ha sido agregado al carrito!`,
  });

  handleRemoveItemFromWishlist(product, false);
};

const handleRemoveItemFromWishlist = (product: any, notify = true) => {
  wishlist.removeItemFromWishlist(product);
  loadWishlist();

  if (!notify) return;

  $notify({
    group: 'all',
    title: 'Eliminado',
    text: `${product.name} ha sido eliminado de la lista de deseos!`,
  });
};

const loadWishlist = async () => {
  const temp: any[] = [];

  if (!wishlist?.items?.length) {
    productStore.wishlistItems = null;
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

  productStore.wishlistItems = temp;
};

onMounted(() => {
  loadWishlist();
});
</script>

<style scoped>
.wishlist {
  @apply mt-8 max-w-sm sm:(max-w-lg mb-24) lg:(px-7 mt-0 max-w-full);
}

.wishlist__center {
  @apply w-full px-3 mx-auto;
}

.wishlist__header {
  @apply pb-12 text-left lg:pb-24;
}

.wishlist__title {
  @apply text-3xl font-semibold text-yellow-400 lg:text-5xl;
}

.wishlist__subtitle {
  @apply text-xl text-yellow-400 mb-2 font-bold lg:text-2xl;
}

.w-table-wrapper {
  @apply overflow-auto;
}

.w-table {
  @apply w-full border-collapse border-collapse mb-4 text-dark-300;
}

.w-table__thead {
  @apply align-bottom col-span-12;
}

.w-table__tr {
  @apply border-current border-solid border-0;
}

.w-table__th-name {
  @apply border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-blach align-middle text-center font-semibold text-sm;
}

.w-table__th-price {
  @apply border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-blach text-center py-3 font-semibold text-sm;
}

.w-table__th-action {
  @apply border-b-2 border-b-gray-100 border-t-2 border-t-gray-100 bg-white uppercase text-blach text-center font-semibold text-sm align-middle;
}

.w-table__td-product {
  @apply min-w-[200px] px-[10px] py-[30px] lg:(align-middle);
}

.w-table__td-price {
  @apply min-w-[200px] px-[10px] py-[30px] align-middle text-center lg:(w-32 min-w-44);
}

.w-table__td-action {
  @apply min-w-[300px] px-[10px] py-[30px] lg:(w-[25%] min-w-52);
}

.w-table__action-btn {
  @apply inline-block px-8 py-3 rounded-sm transition ease bg-yellow-400 text-sm text-white lg:px-6 active:bg-yellow-500 hover:bg-yellow-500;
}

.w-table__action-delete {
  @apply ml-4 text-red-700;
}
</style>
