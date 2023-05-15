<template>
  <div class="detail flex p-4 gap-4">
    <div
      class="max-w-full p-6 bg-gray-100 shadow-md container relative rounded-xl flex flex-col md:flex-row lg:mx-auto"
    >
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
