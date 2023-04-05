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
