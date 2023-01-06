<template>
  <div class="ps-product__info">
    <product-info :product="product" />
    <product-detail-description :product="product" />
    <product-shopping :product="product" />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
}

defineProps<Props>();
</script>
