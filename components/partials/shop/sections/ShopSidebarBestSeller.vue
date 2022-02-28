<template lang="html">
    <div class="ps-block--shop-features">
        <div class="ps-block__header">
            <h3>Best Sale Items</h3>
            <div class="ps-block__navigation">
                <a class="ps-carousel__prev">
                    <i class="icon-chevron-left"></i>
                </a>
                <a class="ps-carousel__next">
                    <i class="icon-chevron-right"></i>
                </a>
            </div>
        </div>
        <div class="ps-block__content">
            <div class="ps-carousel" v-swiper:mySwiper="carouselSetting">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="product in products">
                        <product-default :product="product" />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'ShopSidebarBestSeller',
    components: { ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: ''
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
            carouselSetting: {
                loop: true,
                slidesPerView: 4,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.ps-carousel__next',
                    prevEl: '.ps-carousel__prev'
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 4
                    },
                    1366: {
                        slidesPerView: 4,
                        pagination: {
                            el: '.swiper-pagination',
                            dynamicBullets: true
                        }
                    },
                    1024: {
                        slidesPerView: 3
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
