<template>
  <!-- <p v-if="product.attributes.sale_price" class="ps-product__price sale">
    ${{ product.attributes.price }}
    <del class="ml-2"> ${{ product.attributes.sale_price }}</del>
  </p> -->
  <p class="product__price">${{ product.attributes.price }}</p>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
};

defineProps<Props>();
</script>
