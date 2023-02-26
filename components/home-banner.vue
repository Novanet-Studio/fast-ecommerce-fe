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
              <nuxt-img class="banner__slider-image" :src="image" alt="" />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="banner__right">
        <nuxt-link to="/shop" class="flex-1 flex">
          <img
            src="~/assets/img/slider/home/promotion-1.jpeg"
            alt="Promotion 1"
          />
        </nuxt-link>
        <nuxt-link to="/shop" class="h-full flex-1">
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
  '/slider/home/1.jpg',
  '/slider/home/2.jpg',
  '/slider/home/3.jpg',
];
</script>

<style lang="scss" scoped>
/* Set color for swiper arrows */
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  color: #fbbf24 !important;
}
</style>
