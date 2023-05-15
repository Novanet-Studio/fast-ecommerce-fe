<template>
  <nuxt-link :to="`/product/${product.id}`" class="product-mini-cart__title">
    {{ product.name && product.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>

<style scoped>
.product-mini-cart__title {
  @apply m-0 block text-sm pt-2 pb-1 pl-0 lg:max-h-[calc(1.2em*2)] overflow-hidden pr-4 text-yellow-500;
}
</style>
