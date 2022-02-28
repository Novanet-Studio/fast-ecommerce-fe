<template lang="html">
    <section
        class="ps-product-list ps-section--carousel-outside"
        id="market2-clothing"
    >
        <div class="container">
            <div class="ps-section__header">
                <h3>Apparels & Clothings</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link to="/shop">
                            New Arrivals
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Best seller
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Must Popular
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            View All
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-section__content">
                <carousel-arrows type="simple" />
                <div class="ps-carousel" v-swiper:mySwiper="carouselSetting">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="product in products">
                            <product-default :product="product" />
                        </div>
                    </div>
                    <!--Carousel controls-->
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault';
import { carouselStandard } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    name: 'Market2Clothing',
    components: { CarouselArrows, ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            categories: state => state.collection.categories
        }),
        products() {
            return getColletionBySlug(this.categories, this.collectionSlug);
        }
    },
    data() {
        return {
            carouselSetting: {
                ...carouselStandard,
                loop: true,
                slidesPerView: 5,
                spaceBetween: 10,
                navigation: {
                    nextEl: '#market2-clothing .swiper-next',
                    prevEl: '#market2-clothing .swiper-prev'
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 5
                    },
                    1366: {
                        slidesPerView: 4
                    },
                    1200: {
                        pagination: false
                    },
                    1024: {
                        slidesPerView: 4
                    },
                    768: {
                        slidesPerView: 3
                    },
                    480: {
                        slidesPerView: 2
                    }
                }
            }
        };
    }
};
</script>
<style lang="scss" scoped></style>
