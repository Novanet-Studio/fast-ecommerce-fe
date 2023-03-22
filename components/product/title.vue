<template>
  <nuxt-link
    :to="`/product/${product.id}`"
    class="product-mini-cart__title pt-2"
  >
    {{ product.name && product.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>
