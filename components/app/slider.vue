<template>
  <swiper
    :slides-per-view="1"
    :space-between="1"
    loop
    navigation
    :modules="modules"
  >
    <template v-if="renderImages">
      <swiper-slide v-for="(image, index) in images" :key="index">
        <nuxt-img
          class="slider__image"
          :src="image"
          alt="Products of the brand"
        />
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
  </swiper>
</template>

<script lang="ts" setup>
import { Navigation, Autoplay, Pagination, SwiperOptions } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import type { SwiperModule } from 'swiper/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type RootProps = Omit<SwiperOptions, 'modules'>;

interface Props extends /* @vue-ignore */ RootProps {
  items: string[] | Product[];
  modules?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  modules: () => ['navigation'],
});

const renderImages = ref(false);
const images = ref<string[]>([]);
const products = ref<Product[]>();

const swiperModules: { [key: string]: SwiperModule } = {
  autoplay: Autoplay,
  navigation: Navigation,
  pagination: Pagination,
};

const modules = computed(() => {
  const final: SwiperModule[] = [];

  props.modules?.forEach((module) => {
    final.push(swiperModules[module]);
  });

  return final;
});

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

<style scoped>
.slider__image {
  @apply w-full;
}
</style>
