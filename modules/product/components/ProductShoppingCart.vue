<template>
  <div class="flex flex-nowrap flex-row items-center">
    <div class="w-full max-w-[6.25rem]">
      <product-thumbnail-image :product="product" />
    </div>
    <div class="text-left w-full pl-8">
      <product-title :product="product" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
};

defineProps<Props>();
</script>
