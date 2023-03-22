<template>
  <p class="product__price" :class="class">${{ product.price }}</p>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
  class?: string;
};

defineProps<Props>();
</script>
