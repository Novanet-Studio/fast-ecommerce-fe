<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const props = defineProps<{
  id: string;
  title: string;
  imageClass?: string;
  product: Product;
}>();

provide(injectKeys.product, props.product);
</script>

<template>
  <div class="shopping-cart-table">
    <div class="shopping-cart-table__thumbnail">
      <product-thumbnail-image :class="imageClass" />
    </div>
    <div class="shopping-cart-table__title">
      <product-title :id="id">
        {{ title }}
      </product-title>
    </div>
  </div>
</template>

<style scoped>
.shopping-cart-table {
  @apply flex flex-nowrap flex-row items-center;
}

.shopping-cart-table__thumbnail {
  @apply w-full max-w-[6.25rem];
}

.shopping-cart-table__title {
  @apply text-left w-full pl-8;
}
</style>
