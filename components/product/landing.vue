<template>
  <div class="landing" v-if="category?.attributes?.products.data.length">
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

import { getProductsByCategoryId } from '~/graphql';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  category: Category;
};

const props = defineProps<Props>();
const { $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();

const products = ref<Product[]>([]);
const modules = [Autoplay, Navigation, Pagination];

const productsByCategory = async () => {
  try {
    const { data } = await graphql<ProductsResponse>(getProductsByCategoryId, {
      id: props.category.id,
    });

    products.value = data.products.data;
  } catch (error) {
    $notify({
      group: '',
      title: 'Error',
      text: 'Hubo un error al intentar cargar los productos',
    });
    console.log(error);
  }
};

onMounted(() => {
  productsByCategory();
});
</script>
