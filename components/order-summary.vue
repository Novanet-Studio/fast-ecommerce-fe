<template>
  <div v-if="cart.cartItems?.length">
    <h3 class="order-summary__title" v-if="!shipping">Tu Orden</h3>
    <div class="order-summary__content">
      <figure class="order-summary__figure">
        <figcaption class="order-summary__figcaption">
          <strong class="order-summary__strong-text">Producto</strong>
          <strong class="order-summary__strong-text">total</strong>
        </figcaption>
      </figure>
      <figure class="order-summary__figure">
        <template v-for="(item, index) in product.cartProducts" :key="index">
          <nuxt-link
            :to="`/product/${item.id}`"
            class="order-summary__link flex-1"
          >
            {{ item.name }}
          </nuxt-link>
          <p class="order-summary__price">
            {{ cart.cartItems[index]?.quantity }} x ${{ item.price.toFixed(2) }}
          </p>
        </template>
      </figure>
      <figure class="order-summary__figure">
        <figcaption class="order-summary__figcaption">
          <strong class="order-summary__strong-text">Subtotal</strong>
          <small>$ {{ cart.amount }}</small>
        </figcaption>
      </figure>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  shipping?: boolean;
};
const { $store } = useNuxtApp();
const cart = $store.cart();
const product = $store.product();

// cart.loadCartProducts();

withDefaults(defineProps<Props>(), {
  shipping: false,
});
</script>

<style scoped>
.order-summary__title {
  @apply font-semibold mb-3 text-yellow-400 text-2xl;
}

.order-summary__content {
  @apply px-5 py-8 mb-3 rounded-sm border border-light-600;
}

.order-summary__figure {
  @apply mb-6 pb-6 border-b-2 border-b-light-600;
}

.order-summary__figcaption {
  @apply flex justify-between font-normal;
}

.order-summary__strong-text {
  @apply text-sm text-dark-200 font-semibold uppercase;
}

.order-summary__link {
  @apply py-3 flex justify-between w-full;
}

.order-summary__price {
  @apply text-sm text-dark-100;
}
</style>
