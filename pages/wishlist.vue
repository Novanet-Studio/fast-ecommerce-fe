<template>
  <wishlist-wrapper>
    <wishlist-header>Lista de deseos</wishlist-header>
    <wishlist-header no-articles v-if="!productStore.wishlistItems">
      No tienes articulos en tu lista de deseos
    </wishlist-header>
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
          <tr class="table-tr" v-for="item in productStore.wishlistItems" :key="item?.id">
            <td class="product-td">
              <product-shopping-cart image-class="!h-24" :id="item!.id" :title="item!.name" :product="item!" />
            </td>
            <td class="price-td">$ {{ item?.price.toFixed(2) }}</td>
            <td class="actions-td">
              <app-button class="!w-48" @click="handleAddToCart(item!)">
                Añadir al carrito
              </app-button>
              <a href="#" class="text-color-2 ml-4" @click.prevent="handleRemoveItemFromWishlist(item)">
                <div class="i-ph-x-light"></div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </table-wrapper>
  </wishlist-wrapper>
</template>

<script lang="ts" setup>
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
  @apply text-sm font-bold text-color-2 px-6 py-4 text-left lg: text-base;
}

.table-tr {
  @apply border-b transition duration-300 ease-in-out hover: bg-color-8 group;
}

.product-td {
  @apply px-6 py-4 text-sm font-bold text-color-6 p-2 lg: text-base;
}

.price-td {
  @apply text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg: text-base;
}

.actions-td {
  @apply text-sm text-color-6 font-light px-6 py-4 lg: text-base lg:flex items-center h-full;
}
</style>
