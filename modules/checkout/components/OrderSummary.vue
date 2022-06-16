<template>
  <div v-if="cart.cartItems?.length">
    <h3 v-if="!shipping" class="font-semibold mb-3 text-yellow-400 text-2xl">Tu Orden</h3>
    <div>
      <div class="px-5 py-8 mb-3 rounded-sm border border-light-600">
        <figure class="mb-6 pb-6 border-b-2 border-b-light-600">
          <figcaption class="flex justify-between font-normal">
            <strong class="text-sm text-dark-200 font-semibold uppercase">Producto</strong>
            <strong class="text-sm text-dark-200 font-semibold uppercase">total</strong>
          </figcaption>
        </figure>
        <figure class="mb-6 pb-6 border-b-2 border-b-light-600">
          <template v-for="(productList, listIndex) in product.cartProducts" :key="listIndex">
            <template v-for="(item, index) in productList.data.products.data" :key="item.id">
              <nuxt-link :to="`/product/${item.id}`" class="py-3 flex justify-between w-full">
                {{ item.attributes.name }}
              </nuxt-link>
              <p class="text-sm text-dark-100">{{ cart.cartItems[index].quantity }} x ${{
              item.attributes.price.toFixed(2)
              }}
              </p>
            </template>
          </template>
        </figure>
        <figure class="mb-6 pb-6 border-b-2 border-b-light-600">
          <figcaption class="flex justify-between font-normal">
            <strong class="text-sm text-dark-200 font-semibold uppercase">Subtotal</strong>
            <small>$ {{ cart.amount }}</small>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProductById } from '~/modules/product/queries';

type Props = {
  shipping: boolean;
};

const graphql = useStrapiGraphQL();
const { $store } = useNuxtApp();
const cart = $store.cart();
const product = $store.product();

withDefaults(defineProps<Props>(), {
  shipping: false,
});

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) => graphql<ProductsResponse>(GetProductById, { id }));


  const response = await Promise.all(productPromises);
  product.cartProducts = response;

  cart.loading = false;
}

onMounted(async () => {
  await loadCartProducts();
});
</script>
