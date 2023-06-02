<template>
  <nuxt-link :class="class" :to="`/product/${id}`">
    <nuxt-img
      v-if="imageUrl"
      :src="imageUrl"
      :alt="image.name"
      :placeholder="[100, 50, 10]"
      sizes="sm:100vw md:50vw lg:200px"
      fit="outside"
      class="h-full w-full object-contain"
    />
  </nuxt-link>
</template>

<script lang="ts" setup>
interface Props {
  id: string;
  image: Image;
  class?: string;
}

const props = defineProps<Props>();
const imageUrl = computed(() => props?.image.formats?.small?.url);
</script>
