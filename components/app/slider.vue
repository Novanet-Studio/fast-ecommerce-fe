<script lang="ts" setup>
import { Navigation } from 'swiper/modules';
import 'swiper/element/css/navigation';

interface Props {
  items: string[] | Product[];
  slidesPerView?: number;
  spaceBetween?: number;
  centeredSlides?: boolean;
  breakpoints?: Record<number, Record<string, unknown>>;
}

const props = withDefaults(defineProps<Props>(), {
  slidesPerView: 1,
  spaceBetween: 1,
  centeredSlides: false,
});

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
  <swiper-container
    :slides-per-view="slidesPerView"
    :space-between="spaceBetween"
    :centered-slides="centeredSlides"
    :breakpoints="breakpoints"
    loop
    navigation="true"
    :modules="[Navigation]"
  >
    <template v-if="renderImages">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <nuxt-img class="w-full" :src="image" alt="Products of the brand" />
      </swiper-slide>
    </template>
    <template v-else>
      <swiper-slide
        v-for="item in products"
        :key="item.id"
        class="landing__slide"
      >
        <slot :product="item" />
      </swiper-slide>
    </template>
  </swiper-container>
</template>

<style scoped>
:global(:root) {
  --swiper-navigation-color: #161824;
}

:root {
  --swiper-navigation-color: #161824;
  --swiper-pagination-color: #161824;
}

swiper-container::part(button-prev),
swiper-container::part(button-next) {
  --swiper-navigation-size: 1.5rem;
}
</style>
