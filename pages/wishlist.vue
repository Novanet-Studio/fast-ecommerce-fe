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
            <div class="overflow-hidden rounded-md">
              <table class="min-w-full">
                <thead class="border-b">
                  <tr>
                    <th
                      scope="col"
                      class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
                    >
                      Nombre
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
                    >
                      Precio por unidad
                    </th>
                    <th
                      scope="col"
                      class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="border-b transition duration-300 ease-in-out hover:bg-color-8 group"
                    v-for="item in productStore.wishlistItems"
                    :key="item?.id"
                  >
                    <td
                      class="px-6 py-4 text-sm font-bold text-color-6 p-2 lg:text-base"
                    >
                      <product-shopping-cart
                        image-class="!h-24"
                        :id="item!.id"
                        :title="item!.name"
                        :product="item!"
                      />
                    </td>
                    <td
                      class="text-sm text-color-6 font-light px-6 py-4 whitespace-nowrap lg:text-base"
                    >
                      $ {{ item?.price.toFixed(2) }}
                    </td>
                    <td
                      class="text-sm text-color-6 font-light px-6 py-4 lg:text-base lg:flex items-center h-full"
                    >
                      <app-button
                        class="!w-48 !mt-14"
                        @click="handleAddToCart(item!)"
                      >
                        Añadir al carrito
                      </app-button>
                      <a
                        href="#"
                        class="text-color-2 ml-2 !mt-12"
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
