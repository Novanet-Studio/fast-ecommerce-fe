<template>
  <div class="ps-home-banner ps-home-banner--1">
    <div class="ps-container">
      <div class="ps-section__left">
        <div class="ps-carousel">
          <swiper :slides-per-view="1" :space-between="1" loop navigation :modules="[Navigation]">
            <swiper-slide class="ps-banner bg--cover">
              <div class="ps-banner bg--cover" :style="{
                backgroundImage: `url(/img/slider/home/slide-1.jpg)`
              }"></div>
            </swiper-slide>
            <swiper-slide>
              <div class="ps-banner bg--cover" :style="{
                backgroundImage: `url(/img/slider/home/slide-2.jpg)`
              }"></div>
            </swiper-slide>
            <swiper-slide>
              <div class="ps-banner bg--cover" :style="{
                backgroundImage: `url(/img/slider/home/slide-3.jpg)`
              }"></div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
      <div class="ps-section__right">
        <!-- <nuxt-link to="/shop" class="ps-collection">
          <img src="/img/slider/home/promotion-1.jpeg" alt="martfury" />
        </nuxt-link>
        <nuxt-link to="/shop" class="ps-collection">
          <img src="/img/slider/home/promotion-2.jpeg" alt="martfury" />
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
</script>

<style lang="scss" scoped>
.ps-home-banner {
  padding-top: 30px;
  margin-bottom: 30px;
}

.ps-home-banner .ps-container {
  display: flex;
  flex-flow: row nowrap;
}

.ps-section__left {
  height: 100%;
  width: 100%;
}

.ps-home-banner .ps-banner {
  height: 50rem;
  width: 100%;
}
</style>
