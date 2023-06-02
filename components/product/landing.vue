<template>
  <div class="landing" v-if="products?.length">
    <div class="landing__wrapper">
      <div class="landing__header">
        <h3 class="landing__title">
          {{ category.name }}
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
const productStore = useProductStore();

const products = ref<Product[] | null>(null);
const modules = [Autoplay, Navigation, Pagination];

onMounted(async () => {
  const result = await productStore.getByCategory(props.category.id);
  products.value = result;
});
</script>

<style scoped>
.landing {
  @apply pb-20;
}

.landing__header {
  @apply flex flex-nowrap justify-between items-center px-5 py-4 bg-light-600 border-b-2 border-b-gray-300;
}

.landing__title {
  @apply mb-0 inline-block text-xl font-medium text-color-2;
}

.landing__content {
  @apply relative pt-6;
}

.landing__slide {
  @apply !w-[167px] mr-2 md:(!w-180px mr-10px) lg:(!w-[260px] mr-0);
}
</style>
