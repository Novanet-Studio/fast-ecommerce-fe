<template lang="html">
    <section class="ps-home-banner">
        <div
            class="ps-carousel ps-carousel--boxed"
            v-swiper:mySwiper="swiperOption"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div
                        class="ps-banner--market-4"
                        :style="{
                            backgroundImage: `url(/img/slider/home-6/1.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-6/1.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Limit Edition</h4>
                            <h3>
                                HAPPY SUMMER <br />
                                COMBO SUPER COOL <br />
                                UP TO
                                <strong> 40%</strong>
                            </h3>
                            <a class="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div
                        class="ps-banner--market-4"
                        :style="{
                            backgroundImage: `url(/img/slider/home-6/2.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-6/2.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Version 2020</h4>
                            <h3>
                                EXPERIENCE FEEL <br />
                                GREATEST WITH VITURAL <br />
                                REALITY JUST
                                <strong> $599</strong>
                            </h3>
                            <a class="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div>
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
            <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MarketPlace4Banner',
    data() {
        return {
            swiperOption: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.ps-carousel--boxed .swiper-prev',
                    prevEl: '.ps-carousel--boxed .swiper-next'
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
