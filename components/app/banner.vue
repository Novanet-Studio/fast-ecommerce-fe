<template>
  <div class="banner">
    <div class="banner__wrapper">
      <div class="banner__left">
        <div class="banner__slider">
          <app-slider :images="appConfig.home.slider" />
        </div>
      </div>
      <div class="banner__right">
        <nuxt-img
          v-for="(image, index) in appConfig.home.promotions"
          :src="image"
          alt=""
          class="h-full"
          :key="index"
        />
        <!-- <img
          src="~/assets/img/slider/home/promotion-1.jpeg"
          class="max-w-[50%] lg:max-w-full"
          alt="Promotion 1"
        />
        <img
          src="~/assets/img/slider/home/promotion-2.jpeg"
          alt="Promotion 2"
          class="max-w-[50%] lg:max-w-full"
        /> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const appConfig = useAppConfig();
</script>

<style scoped>
/* Set color for swiper arrows */
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
  --swiper-navigation-color: #161824;
  @apply transition;
}

:global(.swiper-button-next:hover),
:global(.swiper-button-prev:hover) {
  --swiper-navigation-color: #e36d65;
}

:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  --swiper-navigation-sides-offset: 0;
  @apply p-8 transition hover:(bg-color-1);
}

:deep(.swiper-button-next:hover),
:deep(.swiper-button-prev:hover) {
  --swiper-navigation-color: #161824;
}

.banner {
  @apply pt-8 mb-8;
}

.banner__wrapper {
  @apply flex flex-col flex-nowrap lg:flex-row;
}

.banner__left {
  @apply w-[340px] min-h-[200px] h-full mb-4 md:w-full lg:(max-w-[calc(100%-390px)] w-full);
}

.banner__slider {
  @apply h-full relative;
}

.banner__slider-image {
  @apply block w-full h-full bg-center bg-cover md:h-xl lg:(w-full min-h-xl h-80);
}

.banner__right {
  @apply w-full flex justify-between gap-4 text-white lg:(max-w-[390px] ml-8 flex-col gap-8);
}
</style>
