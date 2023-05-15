<template>
  <div class="banner">
    <div class="banner__wrapper">
      <div class="banner__left">
        <div class="banner__slider">
          <swiper
            :slides-per-view="1"
            :space-between="1"
            loop
            navigation
            :modules="[Navigation]"
          >
            <swiper-slide v-for="(image, index) in sliderImages" :key="index">
              <img
                class="banner__slider-image"
                :src="image"
                alt="Products of the brand"
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="banner__right">
        <nuxt-link class="flex-1 flex">
          <img
            src="~/assets/img/slider/home/promotion-1.jpeg"
            alt="Promotion 1"
          />
        </nuxt-link>
        <nuxt-link class="h-full flex-1">
          <img
            src="~/assets/img/slider/home/promotion-2.jpeg"
            alt="Promotion 2"
          />
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

const sliderImages = [
  'img/slider/1.jpg',
  'img/slider/2.jpg',
  'img/slider/3.jpg',
];
</script>

<style scoped>
/* Set color for swiper arrows */
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
  --swiper-navigation-color: #fbbf24;
}

.banner {
  @apply pt-8 mb-8;
}

.banner__wrapper {
  @apply flex flex-col flex-nowrap max-w-[1650px] mx-auto lg:flex-row;
}

.banner__left {
  @apply w-full min-h-full mb-4 lg:max-w-[calc(100%-390px)];
}

.banner__slider {
  @apply min-h-full relative;
}

.banner__slider-image {
  @apply block w-full h-80 bg-center bg-cover lg:(h-full min-h-xl);
}

.banner__right {
  @apply w-full flex justify-between gap-4 text-white lg:(max-w-[390px] ml-8 flex-col gap-8);
}
</style>
