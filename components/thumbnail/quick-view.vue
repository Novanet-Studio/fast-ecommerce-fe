<template>
  <div class="thumbnail-quick-view">
    <figure class="thumbnail-quick-view__figure">
      <div class="thumbnail-quick-view__content">
        <swiper :centered-slides="true" navigation :modules="[Navigation]">
          <swiper-slide
            v-for="(image, index) in product.image"
            :key="index"
            class="thumbnail-quick-view__slide !flex"
          >
            <img :src="image.formats.thumbnail.url" />
          </swiper-slide>
        </swiper>
      </div>
    </figure>
  </div>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

defineProps<{ product: ProductsMapped }>();
</script>

<style scoped>
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
}
</style>
