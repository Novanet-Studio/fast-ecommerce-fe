<template>
  <div class="landing" v-if="category?.attributes?.products?.data.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.attributes.name }}
        </h3>
      </div>
      <div class="landing__content">
        <swiper
          navigation
          :modules="modules"
          :slides-per-view="5"
          :space-between="0"
        >
          <swiper-slide
            v-for="product in products"
            :key="product.id"
            class="landing__slide"
          >
            <product-default :product="product" />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  category: Category;
};

const props = defineProps<Props>();
const { $store } = useNuxtApp();
const productStore = $store.product();

const products = ref<Product[] | null>(null);
const modules = [Autoplay, Navigation, Pagination];

onMounted(async () => {
  products.value = await productStore.getProductsByCategory(props.category.id);
});
</script>
