<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const cartStore = useCartStore();
const global = useGlobalStore();

const props = defineProps<{ product: Product }>();

provide(injectKeys.product, props.product);

const cartItems = computed(() => cartStore.cartItems);
const currency = computed(() => global.currency);
const quantity = computed(() => {
  if (!cartItems.value.length) return null;

  const item = cartItems.value.find((item) => item.id === props.product.id);

  if (!item) return null;

  return item.quantity;
});

const handleRemoveProductFromCart = (product: any) => {
  const cartItem = cartItems.value.find((item) => item.id === product.id);
  cartStore.removeProductFromCart(cartItem as CartItem);
};
</script>

<template>
  <div class="product-mini-cart">
    <div class="product-mini-cart__image-wrapper">
      <product-thumbnail-image />
    </div>
    <div class="product-mini-cart__body">
      <a class="product-mini-cart__icon-wrapper" href="#" @click.prevent="handleRemoveProductFromCart(product)">
        <div class="i-ph-x-light text-color-4" />
      </a>
      <product-title :id="product.id">
        {{ product.name }}
      </product-title>
      <small v-if="quantity !== null">
        {{ quantity }} x {{ currency }} {{ product.price }}
      </small>
    </div>
  </div>
</template>

<style scoped>
.product-mini-cart {
  @apply mb-8 flex flex-nowrap h-16;
}

.product-mini-cart__image-wrapper {
  @apply max-w-14 w-full flex-auto;
}

.product-mini-cart__body {
  @apply relative pr-8 pl-5 flex-1;
}

.product-mini-cart__icon-wrapper {
  @apply absolute top-0 right-0;
}
</style>
