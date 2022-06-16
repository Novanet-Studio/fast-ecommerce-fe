<template >
  <div
    class="max-w-full w-full flex flex-row-reverse flex-nowrap justify-center items-center mb-12 mt-12 lg:max-w-[43%]">
    <figure class="relative block flex-basis-[100%] max-w-full m-0 lg:max-w-[calc(100%-60px)]">
      <div class="relative">
        <div class="relative lg:pl-1">
          <swiper :centered-slides="true" navigation :modules=[Navigation]>
            <swiper-slide v-for="(image, index) in product.attributes.image.data" :key="index"
              class="flex justify-center">
              <img :src="image.attributes.formats.thumbnail.url">
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

defineProps<{ product: Product; }>();
</script>
