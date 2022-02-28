<template lang="html">
    <client-only>
        <div class="ps-product__thumbnail" data-vertical="true">
            <figure>
                <div class="ps-wrapper">
                    <!-- Gallery-->
                    <div
                        class="ps-product__gallery ps-carousel inside swiper"
                        v-swiper:swiperGallery="swiperOptionTop"
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
                        <div
                            class="swiper-pagination swiper-pagination-bullets"
                        ></div>
                    </div>
                </div>
            </figure>
            <!--Variants-->
            <div
                class="ps-product__variants swiper"
                v-swiper:swiperVariants="swiperOptionThumbs"
            >
                <div class="swiper-wrapper">
                    <div
                        v-for="(image, index) in product.images"
                        :class="
                            `swiper-slide ${
                                activeSlide === index ? 'active' : ''
                            } `
                        "
                        @click="handleClickSlide(index)"
                    >
                        <img v-if="offline === true" :src="image.url" />
                        <img v-else :src="`${baseURL}${image.url}`" />
                    </div>
                </div>
            </div>
        </div>
    </client-only>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';

export default {
    name: 'ThumbnailAffiliate',
    props: {
        product: {
            type: Object,
            default: {}
        },
        offline: {
            type: Boolean,
            default: () => true
        }
    },
    computed: {
        ...mapState({
            baseURL() {
                return baseUrl;
            }
        })
    },
    data() {
        return {
            swiperOptionTop: {
                loop: false,
                slidesPerView: 1,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                }
            },
            swiperOptionThumbs: {
                direction: 'vertical',
                loop: false,
                spaceBetween: 10,
                slidesPerView: 3,
                centeredSlides: false,
                slideToClickedSlide: false
            },
            activeSlide: 0
        };
    },
    methods: {
        handleClickSlide(index) {
            this.activeSlide = index;
            this.swiperVariants.activeIndex = index;
            this.swiperGallery.slideTo(index, 500, false);
        }
    }
};
</script>

<style lang="scss" scoped></style>
