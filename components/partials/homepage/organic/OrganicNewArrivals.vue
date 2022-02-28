<template lang="html">
    <div class="ps-product-list ps-product-list--2">
        <div class="container">
            <div class="ps-section__header">
                <h3>New Arrivals</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link to="/shop">
                            Milks & Creams
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Fruits
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Vegetables
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Ocean Foods
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Fresh Meats
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
                <div
                    v-if="products.length > 0"
                    class="ps-carousel"
                    v-swiper:mySwiper="carouselSetting"
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
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
                <p v-else>No records</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '../../../elements/product/ProductDefault';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import { carouselStandard } from '~/utilities/carousel-helpers';

export default {
    name: 'OrganicNewArrivals',
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
        carouselSetting() {
            return carouselStandard;
        },

        products() {
            return getColletionBySlug(this.collections, this.collectionSlug);
        }
    }
};
</script>
