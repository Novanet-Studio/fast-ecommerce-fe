<template>
  <client-only>
    <div class="ps-product__thumbnail" data-vertical="true">
      <figure>
        <div class="ps-wrapper max-w-3xl">
          <!-- Gallery-->
          <div class="ps-product__gallery">
            <swiper
              class="main-swiper"
              :space-between="10"
              :navigation="true"
              :modules="modules"
              :thumbs="{ swiper: thumbsSwiper }"
            >
              <swiper-slide v-for="image in product.image" :key="image.id">
                <img :src="image.url" :alt="image.alternativeText" />
              </swiper-slide>
            </swiper>
          </div>
        </div>
      </figure>
      <!-- Thumbnail -->
      <div class="ps-product__variants max-w-48">
        <swiper
          class="swiper-thumbs"
          @swiper="setThumbsSwiper"
          :space-between="10"
          :slides-per-view="4"
          free-mode
          watch-slides-progress
          :modules="modules"
        >
          <swiper-slide v-for="image in product.image" :key="image.id">
            <img
              class="object-contain"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import { Autoplay, Navigation, Pagination, Thumbs, FreeMode } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/free-mode';

type Props = {
  product: ProductsMapped;
};

const props = defineProps<Props>();

const modules = ref([Autoplay, Navigation, Pagination, Thumbs, FreeMode]);

const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};
</script>

<style scoped>
.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin-left: auto;
  margin-right: auto;
}

.swiper-slide {
  background-size: cover;
  background-position: center;
}

.main-swiper {
  /* height: 80%; */
  width: 100%;
}

.swiper-thumbs {
  /* height: 20%; */
  height: 100px;
  width: 300px;
  box-sizing: border-box;
  padding: 10px 0;
}

.swiper-thumbs .swiper-slide {
  width: 25%;
  height: 100%;
  opacity: 0.4;
}

.swiper-thumbs .swiper-slide-thumb-active {
  opacity: 1;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
