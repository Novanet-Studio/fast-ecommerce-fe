<template>
  <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
    {{ product.attributes.name && product.attributes.name }}
  </nuxt-link>
</template>

<script lang="ts" setup>
// TODO: Move this type in correct location
type Props = {
  product: {
    id: string;
    attributes: {
      name: string;
    }
  }
}

defineProps<Props>();
</script>
