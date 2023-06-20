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
      <table-wrapper v-else>
        <table class="table">
          <thead class="">
            <tr>
              <th scope="col" class="table-th">Nombre</th>
              <th scope="col" class="table-th">Precio por unidad</th>
              <th scope="col" class="table-th">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="table-tr"
              v-for="item in productStore.wishlistItems"
              :key="item?.id"
            >
              <td class="product-td">
                <product-shopping-cart
                  image-class="!h-24"
                  :id="item!.id"
                  :title="item!.name"
                  :product="item!"
                />
              </td>
              <td class="price-td">$ {{ item?.price.toFixed(2) }}</td>
              <td class="actions-td">
                <app-button class="!w-48" @click="handleAddToCart(item!)">
                  Añadir al carrito
                </app-button>
                <a
                  href="#"
                  class="text-color-2 ml-4"
                  @click.prevent="handleRemoveItemFromWishlist(item)"
                >
                  <ph-x weight="light" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </table-wrapper>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
import { GetProductById } from '~/graphql/queries';

definePageMeta({
  layout: 'account',
});

const { $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const wishlist = useWishlistStore();
const productStore = useProductStore();
const cart = useCartStore();

const handleAddToCart = async (product: Product) => {
  const item = {
    id: product.id,
    quantity: 1,
    price: product.price,
  };

  cart.addProductToCart(item);

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  const temp: Product[] = [];

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
  wishlist.removeItem(product);
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

<style scoped>
.table {
  @apply min-w-full;
}

.t-head {
  @apply border-b;
}

.table-th {
  @apply text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base;
}

.table-tr {
  @apply border-b transition duration-300 ease-in-out hover:bg-color-8 group;
}

.product-td {
  @apply px-6 py-4 text-sm font-bold text-color-6 p-2 lg:text-base;
}

.price-td {
  @apply text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base;
}

.actions-td {
  @apply text-sm text-color-6 font-light px-6 py-4 lg:text-base lg:flex items-center h-full;
}

.wishlist {
  @apply mt-4 max-w-sm sm:(max-w-lg mb-24) md:max-w-2xl lg:(px-7 mt-0 max-w-full);
}

.wishlist__center {
  @apply w-full px-3 mx-auto;
}

.wishlist__header {
  @apply pb-12 text-left lg:pb-24;
}

.wishlist__title {
  @apply text-3xl font-semibold text-color-2 lg:text-5xl;
}

.wishlist__subtitle {
  @apply text-xl text-color-2 mb-2 font-bold lg:text-2xl;
}
</style>
