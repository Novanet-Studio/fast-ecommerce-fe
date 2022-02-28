<template lang="html">
    <section class="ps-home-banner">
        <div
            class="ps-carousel ps-carousel--boxed"
            v-swiper:mySwiper="swiperOption"
        >
            <div class="swiper-wrapper">
                <div class="swiper-slide">
                    <div
                        class="ps-banner--technology"
                        :style="{
                            backgroundImage: `url(/img/slider/home-10/1.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-10/1.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Weekend Promotions</h4>
                            <h3>
                                Mini Helicopter <br />
                                Mini Helicopter <br />
                                sale
                                <strong> 40% Off</strong>
                            </h3>
                            <a className="ps-btn" href="#">
                                Shop Now
                            </a>
                        </div>
                    </div>
                </div>
                <div class="swiper-slide">
                    <div
                        class="ps-banner--technology"
                        :style="{
                            backgroundImage: `url(/img/slider/home-10/2.jpg)`
                        }"
                    >
                        <img
                            src="~/static/img/slider/home-10/1.jpg"
                            alt="martfury"
                        />
                        <div class="ps-banner__content">
                            <h4>Weekend Promotions</h4>
                            <h3>
                                iLuv Aud Mini & <br />
                                Ultra Slim Pocket-Sized <br />
                                speaker just
                                <strong> 40% Off</strong>
                            </h3>
                            <a className="ps-btn" href="#">
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
    name: 'TechnologyBanner',
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
