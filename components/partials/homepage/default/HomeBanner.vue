<template lang="html">
    <div class="ps-home-banner ps-home-banner--1">
        <div class="ps-container">
            <div class="ps-section__left">
                <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div
                                class="ps-banner bg--cover"
                                :style="{
                                    backgroundImage: `url(/img/slider/home-1/slide-1.jpg)`
                                }"
                            ></div>
                        </div>
                        <div class="swiper-slide">
                            <div
                                class="ps-banner bg--cover"
                                :style="{
                                    backgroundImage: `url(/img/slider/home-1/slide-2.jpg)`
                                }"
                            ></div>
                        </div>
                        <div class="swiper-slide">
                            <div
                                class="ps-banner bg--cover"
                                :style="{
                                    backgroundImage: `url(/img/slider/home-1/slide-3.jpg)`
                                }"
                            ></div>
                        </div>
                    </div>
                    <!--Carousel controls-->
                    <div class="swiper-nav">
                        <span class="swiper-arrow swiper-prev"
                            ><i class="icon-chevron-left"></i
                        ></span>
                        <div class="swiper-arrow swiper-next">
                            <i class="icon-chevron-right"></i>
                        </div>
                    </div>
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
            </div>
            <div class="ps-section__right">
                <nuxt-link to="/shop" class="ps-collection">
                    <img
                        src="/img/slider/home-1/promotion-1.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
                <nuxt-link to="/shop" class="ps-collection">
                    <img
                        src="/img/slider/home-1/promotion-2.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'HomeBanner',
    data() {
        return {
            swiperOption: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 1,
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
