<template lang="html">
    <div class="ps-product__thumbnail">
        <figure>
            <div class="ps-wrapper">
                <div
                    class="ps-product__gallery ps-carousel inside swiper"
                    v-swiper:mySwiper="swiperOptionTop"
                    ref="swiperTop"
                >
                    <div class="swiper-wrapper">
                        <div
                            class="swiper-slide"
                            v-for="image in product.images"
                        >
                            <img :src="`${baseURL}${image.url}`" />
                        </div>
                    </div>
                    <div class="swiper-nav">
                        <span class="swiper-arrow swiper-prev">
                            <i class="icon-chevron-left"></i>
                        </span>
                        <div class="swiper-arrow swiper-next">
                            <i class="icon-chevron-right"></i>
                        </div>
                    </div>
                </div>
            </div>
        </figure>
    </div>
</template>

<script>
import { baseUrl } from '~/repositories/Repository';

export default {
    name: 'ThumbnailQuickView',
    props: {
        product: {
            type: Object,
            default: {}
        }
    },
    computed: {
        baseURL() {
            return baseUrl;
        }
    },
    data() {
        return {
            swiperOptionTop: {
                loop: true,
                loopedSlides: 1,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
