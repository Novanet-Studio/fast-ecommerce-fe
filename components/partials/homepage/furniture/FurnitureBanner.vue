<template lang="html">
    <section class="ps-home-banner">
        <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div
                        class="ps-banner--furniture bg--cover"
                        :style="{
                            backgroundImage: `url(/img/slider/home-8/1.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-8/1.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Limit Edition</h4>
                            <h3>
                                SCADINAVIA <br />
                                COLLECTIONS FOR YOUR <br />
                                BEDROOM JUST
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
                        class="ps-banner--furniture bg--cover"
                        :style="{
                            backgroundImage: `url(/img/slider/home-8/1.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-8/2.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Version 2020</h4>
                            <h3>
                                HAPPY SUMMER <br />
                                WOODEN FURNTITURE <br />
                                SALE
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
    name: 'FurnitureBanner',
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
