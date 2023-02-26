<template>
  <div>
    <h1 class="text-3xl mb-2">{{ product.name }}</h1>
    <!-- FIX: here is "is_sale" not "sale_price" -->
    <h4 v-if="!!product.sale_price" class="text-2xl font-light">
      <del class="mr-2"> $ {{ product.sale_price }}</del>
      ${{ product.price }}
    </h4>
    <h4 v-else class="text-2xl font-light">${{ product.price }}</h4>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>
