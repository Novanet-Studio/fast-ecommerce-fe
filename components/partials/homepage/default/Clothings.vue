<template lang="html">
    <div class="ps-product-list ps-clothings ps-section--carousel-outside">
        <div class="ps-container">
            <div class="ps-section__header">
                <h3>{{ $t('homeDefault.clothing.heading') }}</h3>
                <ul class="ps-section__links">
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{
                            $t(
                            'homeDefault.consumerElectronics.links.newArrivals'
                            )
                            }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{
                            $t(
                            'homeDefault.consumerElectronics.links.bestSeller'
                            )
                            }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{
                            $t(
                            'homeDefault.consumerElectronics.links.bestSeller'
                            )
                            }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link :to="localePath('/shop')">
                            {{ $t('common.viewAll') }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-section__content">
                <carousel-arrows type="simple" />
                <div
                    class="ps-carousel outside"
                    v-swiper:carousel="carouselSetting"
                >
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="product in products">
                            <product-default :product="product" />
                        </div>
                    </div>
                    <!--Carousel controls-->
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { carouselFullwidth } from '~/utilities/carousel-helpers.js';
import ProductDefault from '../../../elements/product/ProductDefault';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
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
        products() {
            return getColletionBySlug(this.collections, this.collectionSlug);
        }
    },
    data() {
        return {
            carouselSetting: {
                ...carouselFullwidth,
                navigation: {
                    nextEl: '.ps-clothings .swiper-next',
                    prevEl: '.ps-clothings .swiper-prev'
                }
            }
        };
    }
};
</script>
