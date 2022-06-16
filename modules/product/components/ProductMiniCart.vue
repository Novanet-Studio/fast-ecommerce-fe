<template>
  <div class="mb-8 flex flex-nowrap">
    <div class="max-w-14 w-full flex-auto">
      <product-thumbnail-image :product="product" />
    </div>
    <div class="relative pr-8 pl-5 flex-1">
      <a class="absolute top-0 right-0" href="#" @click.prevent="handleRemoveProductFromCart(product)">
        <i class="icon-cross"></i>
      </a>
      <product-title :product="product" />
      <small v-if="quantity !== null">
        {{ quantity }} x {{ currency }} {{ product.attributes.price }}
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProductById } from '../queries';

const { $store } = useNuxtApp();

const graphql = useStrapiGraphQL();

const cartStore = $store.cart();
const productStore = $store.product();
const global = $store.global();

const props = defineProps<{ product: Product; }>();

const cartItems = computed(() => cartStore.cartItems);
const currency = computed(() => global.currency);
const quantity = computed(() => {
  if (!cartItems.value.length) return null;

  const item = cartItems.value.find((item) => item.id === props.product.id);

  if (!item) return null;

  return item.quantity;
});

const loadCartProducts = async () => {
  try {
    if (!cartItems.value.length) productStore.cartProducts = [];
    if (productStore.cartProducts?.length) return;


    const itemsList = cartStore.cartItems.map((item) =>
      graphql<ProductsResponse>(GetProductById, { id: item.id })
    );

    const items = await Promise.all(itemsList);

    if (!items?.length) return;

    productStore.cartProducts = items;

  } catch (err) {
    console.log(err);
  } finally {
    cartStore.loading = false;
  }
}

const handleRemoveProductFromCart = (product: any) => {
  const cartItem = cartItems.value.find((item) => item.id === product.id);
  cartStore.removeProductFromCart(cartItem);
  cartStore.loading = true;
  loadCartProducts();
}
</script>

<style lang="scss" scoped>
.ps-product__remove {
  padding: 1rem;
  border: 1px solid rgb(176, 62, 62);
  border-radius: 4px;
}
</style>
