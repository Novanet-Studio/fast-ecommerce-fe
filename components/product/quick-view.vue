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

<style scoped>
.product-quick-view {
  @apply mb-0 flex flex-col flex-wrap justify-center items-center lg:(flex-nowrap flex-row);
}
</style>
