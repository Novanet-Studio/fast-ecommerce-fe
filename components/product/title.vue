<template>
  <!-- ps-product__title -->
  <nuxt-link
    :to="`/product/${product.id}`"
    class="m-0 block text-base pb-1 pl-0 lg:max-h-[calc(1.2em*2)]] overflow-hidden pr-4 text-yellow-500"
  >
    {{ product.attributes.name && product.attributes.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
};

defineProps<Props>();
</script>
