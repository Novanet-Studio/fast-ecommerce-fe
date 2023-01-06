<template>
  <div class="mb-0">
    <div class="flex flex-col flex-wrap justify-center items-center lg:flex-nowrap">
      <thumbnail-quick-view :product="product" />
      <product-information-quick-view :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
}

defineProps<Props>();
</script>
