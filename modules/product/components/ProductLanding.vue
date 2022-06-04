<template>
  <div v-if="category.attributes.products.data.length"
    class="ps-product-list ps-clothings ps-section--carousel-outside">
    <div class="ps-container">
      <div class="ps-section__header">
        <h3>{{ category.attributes.name }}</h3>
      </div>
      <div class="ps-section__content">
        <swiper :navigation="true" :modules="modules" :space-between="30" :centered-slides="true" :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }">
          <swiper-slide style="height: 15rem; width: 100%">1</swiper-slide>
        </swiper>
        <!-- <carousel-arrows type="simple" />
                <div
                    class="ps-carousel outside"
                    v-swiper:carousel="carouselSetting"
                >
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="product in products">                  
                         
                            <product-default :product="product" />
                        </div>
                    </div> -->
        <!--Carousel controls-->
        <!-- <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div> -->
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

// TODO: add typings
type Props = {
  category: any;
}

defineProps<Props>();

// TODO: get products by categories
const products = ref([]);
const modules = ref([Autoplay, Navigation, Pagination]);

const productsByCategory = async () => {
  // TODO: extract categories from database
}

onMounted(async () => {
  await productsByCategory();
});
</script>
