<template>
  <nuxt-link :class="class" :to="`/product/${product.id}`">
    <nuxt-img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="product.name"
      :placeholder="[100, 50, 10]"
      sizes="sm:100vw md:50vw lg:200px"
      fit="outside"
      class="h-full w-full object-contain"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
  class?: string;
}

defineProps<Props>();

const product = inject('product') as Product;
const imageUrl = computed(() => product?.images[0].formats?.small?.url);
</script>
