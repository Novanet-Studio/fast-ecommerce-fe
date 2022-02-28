<template lang="html">
    <section class="ps-home-banner">
        <div class="container">
            <div class="ps-section__left">
                <menu-categories />
            </div>
            <div class="ps-section__center">
                <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/slider/home-5/1.jpg"
                                    alt="martfury"
                                />
                            </nuxt-link>
                        </div>
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/slider/home-5/2.jpg"
                                    alt="martfury"
                                />
                            </nuxt-link>
                        </div>
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/slider/home-5/3.jpg"
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
                <nuxt-link to="/shop">
                    <img
                        src="~/static/img/slider/home-5/promotion-6.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
            </div>
            <div class="ps-section__right">
                <nuxt-link to="/shop">
                    <img
                        src="~/static/img/slider/home-5/promotion-1.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
                <nuxt-link to="/shop">
                    <img
                        src="~/static/img/slider/home-5/promotion-2.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
                <nuxt-link to="/shop" class="wide">
                    <img
                        src="~/static/img/slider/home-5/promotion-3.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
                <nuxt-link to="/shop">
                    <img
                        src="~/static/img/slider/home-5/promotion-4.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
                <nuxt-link to="/shop">
                    <img
                        src="~/static/img/slider/home-5/promotion-5.jpg"
                        alt="martfury"
                    />
                </nuxt-link>
            </div>
        </div>
    </section>
</template>

<script>
import MenuCategories from '~/components/shared/menu/MenuCategories';
export default {
    name: 'MartketPlace3Banner',
    components: { MenuCategories },
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
