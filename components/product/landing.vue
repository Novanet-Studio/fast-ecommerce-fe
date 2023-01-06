<template>
  <div v-if="category.attributes.products.data.length" class="pb-20">
    <div class="max-w-[1650px] mx-auto px-[15px]">
      <div
        class="flex flex-nowrap justify-between items-center px-5 py-4 bg-light-600 border-b-2 border-b-gray-300"
      >
        <h3 class="mb-0 inline-block text-xl font-medium text-yellow-500">
          {{ category.attributes.name }}
        </h3>
      </div>
      <!-- ps-section__content -->
      <div class="relative pt-6">
        <swiper
          navigation
          :modules="modules"
          :slides-per-view="5"
          :space-between="0"
        >
          <swiper-slide
            v-for="product in products"
            :key="product.id"
            class="!w-[260px]"
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
