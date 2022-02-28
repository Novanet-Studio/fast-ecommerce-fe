<template lang="html">
    <div class="ps-block--product-box">
        <div class="ps-block__header">
            <h3><i class="icon-laundry"></i> Consumer Electronic</h3>
            <ul>
                <li>
                    <nuxt-link to="/shop">
                        TV Televisions
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Air Conditioner
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Washing Machine
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Refrigerator
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Microwave
                    </nuxt-link>
                </li>
            </ul>
        </div>
        <div class="ps-block__content">
            <div class="ps-block__left">
                <div class="ps-carousel" v-swiper:mySwiper="swiperOption">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/promotions/home-5/electronic-1.jpg"
                                    alt="martfury"
                                />
                            </nuxt-link>
                        </div>
                        <div class="swiper-slide">
                            <nuxt-link to="/shop">
                                <img
                                    src="~/static/img/promotions/home-5/electronic-2.jpg"
                                    alt="martfury"
                                />
                            </nuxt-link>
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
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
                <div class="ps-block__products">
                    <v-tabs class="ps-tabs" v-model="tab">
                        <v-tab class="ps-tab-title" :ripple="false"
                            >New Arrivals</v-tab
                        >
                        <v-tab class="ps-tab-title" :ripple="false">
                            Best Sellers
                        </v-tab>
                        <v-tab class="ps-tab-title" :ripple="false">Sale</v-tab>
                    </v-tabs>
                    <v-tabs-items v-model="tab">
                        <!--New Arrivals-->
                        <v-tab-item>
                            <div class="row">
                                <template v-for="(product, index) in products">
                                    <div
                                        v-if="index > 0 && index < 5"
                                        class="col-md-3 col-sm-4 col-6"
                                        :key="product.id"
                                    >
                                        <product-default :product="product" />
                                    </div>
                                </template>
                            </div>
                        </v-tab-item>
                        <!--Best Sellers-->
                        <v-tab-item>
                            <div class="row">
                                <template v-for="(product, index) in products">
                                    <div
                                        v-if="index > 1 && index < 6"
                                        class="col-md-3 col-sm-4 col-6"
                                        :key="product.id"
                                    >
                                        <product-default :product="product" />
                                    </div>
                                </template>
                            </div>
                        </v-tab-item>
                        <!--Others-->
                        <v-tab-item>
                            <div class="row">
                                <template v-for="(product, index) in products">
                                    <div
                                        v-if="index > 0 && index < 5"
                                        class="col-md-3 col-sm-4 col-6"
                                        :key="product.id"
                                    >
                                        <product-default :product="product" />
                                    </div>
                                </template>
                            </div>
                        </v-tab-item>
                    </v-tabs-items>
                </div>
            </div>
            <div class="ps-block__right">
                <figure>
                    <figcaption>Recommended For You</figcaption>
                    <template v-for="(product, index) in products">
                        <product-horizontal
                            v-if="index < 5"
                            :product="product"
                            :key="product.id"
                        />
                    </template>
                </figure>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductHorizontal from '~/components/elements/product/ProductHorizontal';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'Market3ConsumerElectronics',
    components: { ProductDefault, ProductHorizontal },
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
            swiperOption: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                }
            },
            tab: null
        };
    }
};
</script>

<style lang="scss" scoped>
.v-tabs {
    border-bottom: 1px solid #eaeaea;
}

.ps-tab-title {
    font-size: 14px;
    letter-spacing: 0;
    text-transform: capitalize;
    font-weight: 400;
    color: $color-heading;
}
</style>
