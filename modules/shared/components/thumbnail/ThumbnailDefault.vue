<template>
  <client-only>
    <div class="ps-product__thumbnail " data-vertical="true">
      <figure>
        <div class="ps-wrapper">
          <!-- Gallery-->
          <div class="ps-product__gallery">
            <swiper class="ps-carousel inside" :navigation="true" :modules="modules" :space-between="30"
              :centered-slides="true" :autoplay="{
                delay: 2500,
                disableOnInteraction: false,
              }" :thumbs="{ swiper: thumbsSwiper }">
              <swiper-slide v-for="image in product.attributes.images.data">
                <img :src="`${image.attributes.url}`" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </figure>
      <!--Variants-->
      <div class="ps-product__variants">
        <swiper class="ps-carousel" :space-between="30" :centered-slides="true" :modules="[Thumbs]"
          watch-slides-progress @swiper="setThumbsSwiper">
          <swiper-slide v-for="(image, index) in product.attributes.images.data" :class="[activeSlide && 'active']"
            :key="index">
            <img :src="image.attributes.url" />
          </swiper-slide>
        </swiper>
        <!-- <div class="ps-carousel swiper" v-swiper:swiperVariants="swiperOptionThumbs">
          <div class="swiper-wrapper">
            <div v-for="(image, index) in product.attributes.images.data" :class="
              `swiper-slide ${activeSlide === index ? 'active' : ''
              } `
            " @click="handleClickSlide(index)">
              <img :src="`${image.attributes.url}`" />
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination, Thumbs } from 'swiper';
import { Swiper, SwiperSlide, useSwiper } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

type Props = {
  product: any;
}

defineProps<Props>();

const modules = ref([Autoplay, Navigation, Pagination, Thumbs]);
const activeSlide = ref<number>(0);

const swiper = useSwiper();
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper) => {
  console.log(swiper);
  thumbsSwiper.value = swiper;
  activeSlide.value = swiper.index;
}
</script>
