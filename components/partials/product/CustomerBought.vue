<template lang="html">
    <div
        :class="
            `ps-section--default ps-customer-bought ${
                boxed === true ? 'boxed' : ''
            }`
        "
    >
        <div class="ps-section__header">
            <h3>Customers who bought this item also bought</h3>
        </div>
        <div class="ps-section__content">
            <div
                class="ps-carousel"
                v-swiper:mySwiper="
                    layout === 'fullwidth' ? settingFullwidth : settingDefault
                "
            >
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="product in products">
                        <product-default :product="product" />
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
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'CustomerBought',
    components: { ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        },
        layout: {
            type: String,
            default: ''
        },
        boxed: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections
        }),
        products() {
            return getColletionBySlug(this.collections, this.collectionSlug);
        }
    },
    data() {
        return {
            settingFullwidth: {
                loop: true,
                slidesPerView: 7,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 6
                    },
                    1366: {
                        slidesPerView: 5,
                        pagination: {
                            el: '.swiper-pagination',
                            dynamicBullets: true
                        }
                    },
                    1024: {
                        slidesPerView: 4
                    },
                    768: {
                        slidesPerView: 3,
                        spaceBetween: 10
                    },
                    480: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    }
                }
            },
            settingDefault: {
                loop: true,
                slidesPerView: 5,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 5
                    },
                    1366: {
                        slidesPerView: 5,
                        pagination: {
                            el: '.swiper-pagination',
                            dynamicBullets: true
                        }
                    },
                    1024: {
                        slidesPerView: 4
                    },
                    768: {
                        slidesPerView: 3,
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
