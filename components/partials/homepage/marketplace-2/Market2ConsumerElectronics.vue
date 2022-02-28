<template lang="html">
    <section
        class="ps-product-list ps-section--carousel-outside"
        id="place2-consumer-electronic"
    >
        <div class="container">
            <div class="ps-section__header">
                <h3>Consumer Electronics</h3>
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
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import ProductDefault from '~/components/elements/product/ProductDefault';
import { mapState } from 'vuex';
import { carouselStandard } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    name: 'Market2ConsumerElectronics',
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
                navigation: {
                    nextEl: '#place2-consumer-electronic .swiper-next',
                    prevEl: '#place2-consumer-electronic .swiper-prev'
                }
            }
        };
    }
};
</script>
<style lang="scss" scoped></style>
