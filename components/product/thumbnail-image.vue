<template>
  <nuxt-link :to="`/product/${product.id}`">
    <nuxt-img :src="productImageUrl" :alt="product.attributes.name" :placeholder="[100, 50, 10]" fit="cover" width="800"
      height="200" />
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
};

const props = defineProps<Props>();

const productImageUrl = computed(
  () => props.product.attributes.image.data[0].attributes.formats?.small?.url
);
</script>
