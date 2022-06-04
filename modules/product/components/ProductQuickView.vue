<template>
  <div class="ps-product--detail ps-product--quickview">
    <div class="ps-product__header">
      <thumbnail-quick-view :product="product" />
      <product-information-quick-view :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
const product: any = '';
</script>
