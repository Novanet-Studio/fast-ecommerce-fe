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
        <template
          v-for="(productList, index) in product.cartProducts"
          :key="index"
        >
          <template
            v-for="(item, index) in productList.data.products.data"
            :key="item.id"
          >
            <nuxt-link :to="`/product/${item.id}`" class="order-summary__link">
              {{ item.attributes.name }}
            </nuxt-link>
            <p class="order-summary__price">
              {{ cart.cartItems[index].quantity }} x ${{
                item.attributes.price.toFixed(2)
              }}
            </p>
          </template>
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
  shipping: boolean;
};
const { $store } = useNuxtApp();
const cart = $store.cart();
const product = $store.product();

useGetCartProducts();

withDefaults(defineProps<Props>(), {
  shipping: false,
});
</script>
