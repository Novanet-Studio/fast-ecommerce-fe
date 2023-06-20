<template>
  <div class="thumbnail-quick-view w100 h100">
    <figure class="thumbnail-quick-view__figure">
      <div class="thumbnail-quick-view__content">
        <swiper :centered-slides="true" navigation :modules="[Navigation]">
          <swiper-slide
            v-for="(image, index) in product.images"
            :key="index"
            class="thumbnail-quick-view__slide !flex"
          >
            <img
              v-if="image.formats?.thumbnail.url"
              class="object-contain max-h-auto"
              :src="image.formats.thumbnail.url"
            />
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

const product = inject('product') as Product;
</script>

<style scoped>
:global(.swiper-button-next),
:global(.swiper-button-prev) {
  --swiper-navigation-size: 2rem;
}

.thumbnail-quick-view {
}

.thumbnail-quick-view__figure {
}

.thumbnail-quick-view__content {
}

.thumbnail-quick-view__slide {
  @apply flex justify-center items-center;
}
</style>
