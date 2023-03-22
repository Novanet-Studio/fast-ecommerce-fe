<template>
  <nuxt-link
    class="flex h-full justify-center items-center"
    :to="`/product/${product.id}`"
  >
    <nuxt-img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="product.name"
      :placeholder="[100, 50, 10]"
      sizes="sm:100vw md:50vw lg:200px"
      fit="outside"
      class="h-full object-contain"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

const props = defineProps<Props>();
const imageUrl = computed(() => props?.product?.image[0]?.formats?.small?.url);
</script>
