<template>
  <div class="detail flex p-4 gap-4">
    <div class="ps-product__header max-w-full">
      <thumbnail-default :product="product" />
      <section class="my-4">
        <h3 class="text-3xl mb-4">Descripción</h3>
        <product-detail-description :product="product" />
      </section>
    </div>
    <information-default :product="product" />
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>
