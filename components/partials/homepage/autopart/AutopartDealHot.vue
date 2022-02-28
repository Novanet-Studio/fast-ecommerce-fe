<template lang="html">
    <div class="ps-deal-hot">
        <div class="container">
            <div class="row">
                <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <div class="ps-block--deal-hot" data-mh="dealhot">
                        <div class="ps-block__header">
                            <h3>Deal hot today</h3>
                            <div class="ps-block__navigation">
                                <a class="ps-carousel__prev" href="#">
                                    <i class="icon-chevron-left"></i>
                                </a>
                                <a
                                    class="ps-carousel__next"
                                    href="ps-carousel--deal-hot"
                                >
                                    <i class="icon-chevron-right"></i>
                                </a>
                            </div>
                        </div>
                        <div class="ps-product__content">
                            <template v-for="(product, index) in products">
                                <product-deal-hot
                                    v-if="index === 0"
                                    :product="product"
                                    :key="product.id"
                                />
                            </template>
                        </div>
                    </div>
                </div>
                <div class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 ">
                    <aside class="widget widget_best-sale" data-mh="dealhot">
                        <h3 class="widget-title">
                            Top 20 Best Seller
                        </h3>
                        <div class="widget__content">
                            <div
                                class="ps-carousel ps-carousel--boxed"
                                v-swiper:mySwiper="swiperOption"
                            >
                                <div class="swiper-wrapper">
                                    <div
                                        v-for="slide in 2"
                                        class="swiper-slide"
                                        :key="slide"
                                    >
                                        <div
                                            class="ps-product-group"
                                            key="group-1"
                                        >
                                            <template
                                                v-for="(product,
                                                index) in products"
                                            >
                                                <product-horizontal
                                                    v-if="index < 4"
                                                    :product="product"
                                                    :key="product.id"
                                                />
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductHorizontal from '~/components/elements/product/ProductHorizontal';
import ProductDealHot from '~/components/elements/detail/ProductDealHot';

export default {
    name: 'AutopartDealHot',
    components: { ProductDealHot, ProductHorizontal },
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
            swiperOption: {
                loop: true,
                speed: 750,

                slidesPerView: 1,
                spaceBetween: 1,
                fadeEffect: {
                    crossFade: true
                },
                navigation: {
                    nextEl: '.ps-carousel__next',
                    prevEl: 'ps-carousel__prev'
                }
            }
        };
    }
};
</script>

<style lang="scss" scoped></style>
