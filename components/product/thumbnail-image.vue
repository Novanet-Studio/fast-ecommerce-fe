<template>
  <nuxt-link :to="`/product/${product.id}`">
    <nuxt-img
      :src="productImageUrl"
      :alt="product.name"
      :placeholder="[100, 50, 10]"
      fit="cover"
      width="800"
      height="200"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

const props = defineProps<Props>();

const productImageUrl = computed(
  () => props.product.image[0].formats?.small?.url
);
</script>
