<script lang="ts" setup>
import {
  FreeMode,
  Navigation,
  Mousewheel,
  Thumbs,
  Autoplay,
  Pagination,
} from 'swiper/modules';
import { injectKeys } from '~/config/constants';
import 'swiper/element/css/navigation';
import 'swiper/element/css/thumbs';

const product = inject(injectKeys.productDetail) as Ref<Product>;
const thumbsSwiper = ref(null);

const setThumbsSwiper = (swiper: any) => (thumbsSwiper.value = swiper);
</script>

<template>
  <client-only>
    <div data-vertical="true">
      <figure>
        <div class="ps-wrapper max-w-3xl">
          <!-- Gallery-->
          <div class="ps-product__gallery">
            <swiper-container
              class="main-swiper"
              navigation
              autoplay
              pagination
              free-mode
              :space-between="10"
              :modules="[
                Autoplay,
                Navigation,
                Pagination,
                Thumbs,
                FreeMode,
                Mousewheel,
              ]"
              thumbs-swiper=".swiper-thumbs"
            >
              <swiper-slide v-for="image in product.images" :key="image.id">
                <img :src="image.url" :alt="image.alternativeText" />
              </swiper-slide>
            </swiper-container>
          </div>
        </div>
      </figure>
      <!-- Thumbnail -->
      <div class="ps-product__variants max-w-48">
        <swiper-container
          class="swiper-thumbs"
          @swiper="setThumbsSwiper"
          :space-between="10"
          :slides-per-view="4"
          free-mode
          watch-slides-progress
          autoplay
          navigation
          pagination
          thumbs
          :modules="[Autoplay, Navigation, Pagination, Thumbs, FreeMode]"
        >
          <swiper-slide v-for="image in product.images" :key="image.id">
            <img
              class="object-contain"
              :src="image.url"
              :alt="image.alternativeText"
            />
          </swiper-slide>
        </swiper-container>
      </div>
    </div>
  </client-only>
</template>

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
