<template>
  <div class="ps-product--cart">
    <div class="ps-product__thumbnail">
      <product-thumbnail-image :product="product" />
    </div>
    <div class="ps-product__content">
      <product-title :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  product: any
}>();
</script>
