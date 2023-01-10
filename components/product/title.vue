<template>
  <!-- ps-product__title -->
  <nuxt-link :to="`/product/${product.id}`" class="product-mini-cart__title">
    {{ product.attributes.name && product.attributes.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
};

defineProps<Props>();
</script>
