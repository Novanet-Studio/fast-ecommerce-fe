<template lang="html">
    <div class="ps-product-list">
        <div class="container">
            <div class="ps-section__header">
                <h3>Popular Smartphones & Tablets</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link to="/shop">
                            Iphone
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            IPad
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Samsung
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
                <div class="ps-carousel" v-swiper:mySwiper="carouselSetting">
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
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ProductDefault from '~/components/elements/product/ProductDefault';
import { mapState } from 'vuex';
import { carouselStandard } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';

export default {
    name: 'TechnologySmartPhone',
    components: { ProductDefault },
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

        carouselSetting() {
            return carouselStandard;
        },

        products() {
            return getColletionBySlug(this.categories, this.collectionSlug);
        }
    }
};
</script>

<style lang="scss" scoped></style>
