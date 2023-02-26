<template>
  <div class="ps-product__info">
    <product-info :product="product" />
    <product-shopping :product="product" />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>
