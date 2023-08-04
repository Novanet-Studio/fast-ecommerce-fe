<script lang="ts" setup>
interface Props {
  items: string[] | Product[];
  modules?: string[];
}

const props = defineProps<Props>()

const renderImages = ref(false);
const images = ref<string[]>([]);
const products = ref<Product[]>();

watchEffect(() => {
  const isString = typeof props!.items[0] === 'string';

  if (isString) {
    renderImages.value = true;
    images.value = props.items as string[];
    return;
  }

  renderImages.value = false;
  products.value = props.items as Product[];
});
</script>

<template>
  <swiper :slides-per-view="1" :space-between="1" loop navigation :modules="[SwiperNavigation]">
    <template v-if="renderImages">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <nuxt-img class="slider__image" :src="image" alt="Products of the brand" />
      </swiper-slide>
    </template>
    <template v-else>
      <swiper-slide v-for="item in products" :key="item.id" class="landing__slide">
        <slot :product="item" />
      </swiper-slide>
    </template>
  </swiper>
</template>

<style scoped>
.slider__image {
  @apply w-full;
}
</style>
