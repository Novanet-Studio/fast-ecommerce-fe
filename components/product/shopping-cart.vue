<template>
  <div class="shopping-cart-table">
    <div class="shopping-cart-table__thumbnail">
      <product-thumbnail-image :product="product" />
    </div>
    <div class="shopping-cart-table__title">
      <product-title :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>
