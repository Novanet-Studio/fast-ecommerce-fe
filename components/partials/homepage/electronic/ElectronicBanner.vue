<template lang="html">
    <section class="ps-home-banner">
        <div class="container">
            <div class="ps-section__left">
                <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="ps-banner">
                                <nuxt-link to="/shop">
                                    <img
                                        src="~/static/img/slider/home-7/1.jpg"
                                        alt="martfury"
                                    />
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="ps-banner">
                                <nuxt-link to="/shop">
                                    <img
                                        src="~/static/img/slider/home-7/2.jpg"
                                        alt="martfury"
                                    />
                                </nuxt-link>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="ps-banner">
                                <nuxt-link to="/shop">
                                    <img
                                        src="~/static/img/slider/home-7/3.jpg"
                                        alt="martfury"
                                    />
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                    <!--Carousel controls-->
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
            <div class="ps-section__right">
                <nuxt-link to="/shop" class="ps-collection">
                    <img
                        src="~/static/img/slider/home-7/promotion-1.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
                <nuxt-link to="/shop" class="ps-collection">
                    <img
                        src="~/static/img/slider/home-7/promotion-2.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'ElectronicBanner',
    data() {
        return {
            swiperOption: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.swiper-prev',
                    prevEl: '.swiper-next'
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
