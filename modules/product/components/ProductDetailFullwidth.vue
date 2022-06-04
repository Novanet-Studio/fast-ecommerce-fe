<template>
  <div class="ps-product--detail ps-product--fullwidth">
    <div class="ps-product__header">
      <thumbnail-default :product="product" />
      <information-default :product="product" />
    </div>
    <!-- <default-description /> -->
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: any;
};

defineProps<Props>();
</script>
