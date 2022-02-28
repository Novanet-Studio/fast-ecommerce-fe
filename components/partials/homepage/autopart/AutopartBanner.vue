<template lang="html">
    <section class="ps-home-banner">
        <div
            class="ps-carousel ps-carousel--boxed"
            v-swiper:mySwiper="swiperOption"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div
                        class="ps-banner--autopart"
                        :style="{
                            backgroundImage: `url(/img/slider/autopart/1.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/autopart/1.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Version 2020</h4>
                            <h3>
                                DUNLOP TIRES <br />
                                FASTER
                            </h3>
                            <p>New version 2020 with many powerful features.</p>
                            <p>
                                <strong>
                                    Faster, Friction better & Cheap Price
                                </strong>
                            </p>
                            <a class="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div
                        class="ps-banner--autopart"
                        :style="{
                            backgroundImage: `url(/img/slider/autopart/2.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/autopart/2.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Version 2020</h4>
                            <h3>
                                CASTROL <br />
                                MOTOR OILS
                            </h3>
                            <p>New version 2018 with many powerful features.</p>
                            <p>
                                <strong
                                    >Faster, Friction better & Cheap
                                    Price</strong
                                >
                            </p>
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
    name: 'AutopartBanner',
    data() {
        return {
            swiperOption: {
                loop: true,
                speed: 750,

                slidesPerView: 1,
                spaceBetween: 1,
                fadeEffect: {
                    crossFade: true
                },
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped>
.ps-home-banner {
    .ps-btn {
        &:hover {
            color: #fff;
        }
    }
}
</style>
