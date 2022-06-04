<template>
  <p v-if="product.isSale" class="ps-product__price sale">
    ${{ product.price }}
    <del class="ml-2"> ${{ product.salePrice }}</del>
  </p>
  <p v-else class="ps-product__price">${{ product.price }}</p>
</template>

<script lang="ts" setup>
type Props = {
  product: {
    id: string;
    quantity: number;
    price: number;
    salePrice: number;
    isSale: boolean;
  }
}

defineProps<Props>();
</script>
