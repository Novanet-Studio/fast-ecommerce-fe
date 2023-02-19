<template>
  <p class="product__price">${{ product.price }}</p>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>
