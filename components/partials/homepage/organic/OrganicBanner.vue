<template lang="html">
    <section class="ps-home-banner">
        <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div
                        class="ps-banner--organic"
                        :style="{
                            backgroundImage: `url(/img/slider/home-9/1.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-9/1.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Weekend Promotions</h4>
                            <h3>
                                Happy Summer <br />
                                combo super discount <br />
                                up to
                                <strong>40% Off</strong>
                            </h3>
                            <a class="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div
                        class="ps-banner--organic"
                        :style="{
                            backgroundImage: `url(/img/slider/home-9/2.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-9/2.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Weekend Promotions</h4>
                            <h3>
                                Fresh vegetables & <br />
                                fruits basket <br />
                                up to
                                <strong>40% Off</strong>
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
    name: 'OrganicBanner',
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
