<template>
  <div class="product-quick-view">
    <thumbnail-quick-view :product="product" />
    <product-information-quick-view :product="product" />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>
