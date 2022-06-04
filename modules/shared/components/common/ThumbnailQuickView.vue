<template >
  <div class="ps-product__thumbnail">
    <figure>
      <div class="ps-wrapper">
        <div class="ps-product__gallery ps-carousel inside">
          <swiper navigation :modules=[Navigation]>
            <swiper-slide v-for="(image, index) in product.images" :key="index">
              <img :src="image.url">
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </figure>
  </div>
</template>

<script lang="ts" setup>
import { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';

type Props = {
  product: {
    images: any[];
  }
}

defineProps<Props>();
</script>
