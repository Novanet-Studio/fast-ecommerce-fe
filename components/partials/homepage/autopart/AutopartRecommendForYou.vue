<template lang="html">
    <section
        class="ps-product-list ps-recommend-for-you ps-section--carousel-outside"
    >
        <div class="container">
            <div class="ps-section__header">
                <h3>RECOMMENDED FOR YOU</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link to="/shop">
                            Best Seller
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            New Arrival
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Top Rated
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/shop">
                            Trending Products
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
                    <div class="swiper-pagination swiper-pagination-bullets" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { carouselStandard } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductDefault from '~/components/elements/product/ProductDefault';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    name: 'AutopartRecommendForYou',
    components: { CarouselArrows, ProductDefault },
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

<style lang="scss" scoped></style>
