<template lang="html">
    <section class="ps-home-banner">
        <div
            class="ps-carousel ps-carousel--boxed"
            v-swiper:mySwiper="swiperOption"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div
                        class="ps-banner--market-1"
                        :style="{
                            backgroundImage: `url(/img/slider/home-3/home-banner/1.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-3/home-banner/1.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h5>Mega Sale Nov 2020</h5>
                            <h3>
                                Double Combo With <br />
                                The Body Shop
                            </h3>
                            <p>Sale up to <strong>50% Off </strong></p>
                            <a class="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div
                        class="ps-banner--market-1"
                        :style="{
                            backgroundImage: `url(/img/slider/home-3/home-banner/2.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-3/home-banner/2.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h5>Mega Sale Nov 2020</h5>
                            <h3>
                                IKEA Minimalist <br />
                                Otoman
                            </h3>
                            <p>Discount <strong>50% Off </strong></p>
                            <a class="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div>
                    </div>
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
            <div class="swiper-pagination swiper-pagination-bullets"></div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'MarketPlaceHomeBanner',
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
