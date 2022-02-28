<template lang="html">
    <section class="ps-home-banner">
        <div class="container">
            <div class="ps-section__left">
                <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/slider/home-4/1.jpg"
                                    alt="martfury"
                                />
                            </nuxt-link>
                        </div>
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/slider/home-4/2.jpg"
                                    alt="martfury"
                                />
                            </nuxt-link>
                        </div>
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/slider/home-4/3.jpg"
                                    alt="martfury"
                                />
                            </nuxt-link>
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
                <nuxt-link to="/shop">
                    <a class="ps-collection">
                        <img
                            src="~/static/img/slider/home-4/left.jpg"
                            alt="martfury"
                        />
                    </a>
                </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MarketPlace2Banner',
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
