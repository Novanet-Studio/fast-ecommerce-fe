<template lang="html">
    <div class="ps-client-say">
        <div class="container">
            <div class="ps-section__header">
                <h3>What client say</h3>
                <div class="ps-section__nav">
                    <a class="ps-carousel__prev" href="#">
                        <i class="icon-chevron-left"></i>
                    </a>
                    <a class="ps-carousel__next" href="#">
                        <i class="icon-chevron-right"></i>
                    </a>
                </div>
            </div>
            <div class="ps-section__content">
                <div class="ps-carousel" v-swiper:mySwiper="carouseSetting">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <div class="ps-block--testimonial">
                                <div class="ps-block__header">
                                    <img
                                        src="~/static/img/users/1.jpg"
                                        alt="martfury"
                                    />
                                </div>
                                <div class="ps-block__content">
                                    <i class="icon-quote-close"></i>
                                    <h4>
                                        Kanye West
                                        <span>Head Chef at BBQ Restaurant</span>
                                    </h4>
                                    <p>
                                        Sed elit quam, iaculis sed semper sit
                                        amet udin vitae nibh. at magna akal
                                        semperFusce commodo molestie
                                        luctus.Lorem ipsum Dolor tusima olatiup.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="ps-block--testimonial">
                                <div class="ps-block__header">
                                    <img
                                        src="~/static/img/users/2.png"
                                        alt="martfury"
                                    />
                                </div>
                                <div class="ps-block__content">
                                    <i class="icon-quote-close"></i>
                                    <h4>
                                        Anabella Kleva
                                        <span>Boss at TocoToco</span>
                                    </h4>
                                    <p>
                                        Sed elit quam, iaculis sed semper sit
                                        amet udin vitae nibh. at magna akal
                                        semperFusce commodo molestie
                                        luctus.Lorem ipsum Dolor tusima olatiup.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="swiper-slide">
                            <div class="ps-block--testimonial">
                                <div class="ps-block__header">
                                    <img
                                        src="~/static/img/users/3.jpg"
                                        alt="martfury"
                                    />
                                </div>
                                <div class="ps-block__content">
                                    <i class="icon-quote-close"></i>
                                    <h4>
                                        William Roles
                                        <span>Head Chef at BBQ Restaurant</span>
                                    </h4>
                                    <p>
                                        Sed elit quam, iaculis sed semper sit
                                        amet udin vitae nibh. at magna akal
                                        semperFusce commodo molestie
                                        luctus.Lorem ipsum Dolor tusima olatiup.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ClientSay',
    data() {
        return {
            carouseSetting: {
                loop: true,
                slidesPerView: 2,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.ps-carousel__next',
                    prevEl: '.ps-carousel__prev'
                },
                breakpoints: {
                    768: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
