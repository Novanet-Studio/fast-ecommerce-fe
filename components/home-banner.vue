<template>
  <div class="pt-8 mb-8">
    <div class="flex flex-col flex-nowrap max-w-[1650px] mx-auto lg:flex-row">
      <div class="w-full min-h-full mb-4 lg:max-w-[calc(100%-390px)]">
        <div class="min-h-full relative">
          <swiper
            :slides-per-view="1"
            :space-between="1"
            loop
            navigation
            :modules="[Navigation]"
          >
            <swiper-slide v-for="(image, index) in sliderImages" :key="index">
              <!-- <div
                class="block w-full h-80 bg-center bg-cover lg:(h-full min-h-xl)"
                :style="{ backgroundImage: `url(${image})` }"
              /> -->
              <nuxt-img
                class="block w-full h-80 bg-center bg-cover lg:(h-full min-h-xl)"
                :src="image"
                alt=""
              />
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div
        class="w-full flex justify-between gap-4 text-white lg:(max-w-[390px] ml-8 flex-col gap-8)"
      >
        <nuxt-link to="/shop" class="flex-1 block flex">
          <img
            src="~/assets/img/slider/home/promotion-1.jpeg"
            alt="Promotion 1"
          />
        </nuxt-link>
        <nuxt-link to="/shop" class="h-full flex-1 block">
          <img
            src="~/assets/img/slider/home/promotion-2.jpeg"
            alt="Promotion 2"
          />
        </nuxt-link>
        <!-- <nuxt-link to="/shop" class="h-full flex-1 block">
          <nuxt-img src="/slider/home/promotion-2.jpeg" alt="Promotion 2" />
        </nuxt-link> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

const clog = (e: any) => {
  console.log(e);
};

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
