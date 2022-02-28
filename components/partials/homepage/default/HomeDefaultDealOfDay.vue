<template lang="html">
    <div class="ps-deal-of-day ps-section--carousel-outside">
        <div class="ps-container">
            <div class="ps-section__header d-none">
                <div class="ps-block--countdown-deal">
                    <div class="ps-block__left">
                        <h3>Deal of the day</h3>
                    </div>
                    <div class="ps-block__right">
                        <figure>
                            <figcaption>End in:</figcaption>
                            <count-down-simple
                                time="12 30 2020, 12:00 am"
                                format="MM DD YYYY, h:mm a"
                            />
                        </figure>
                    </div>
                </div>
                <nuxt-link to="/shop">
                    {{ $t('common.viewAll') }}
                </nuxt-link>
            </div>
            <div v-if="loading" class="row">
                <div class="col-md-2" v-for="item in skeletonItems" :key="item">
                    <skeleton-product/>
                </div>
            </div>
            <div v-else class="ps-section__content">
                <p v-if="productItems === null">No product found.</p>
                <div v-else  class="ps-section__items">
                    <carousel-arrows type="simple"/>
                    <div
                        class="ps-carousel"
                        v-swiper:dealOfDayCarousel="carouselSetting"
                    >
                        <div class="swiper-wrapper">
                            <div class="swiper-slide" v-for="product in productItems">
                                <product-inner
                                    :product="product"
                                    :key="product.id"
                                />
                            </div>
                        </div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import CountDownSimple from '~/components/elements/commons/CountDownSimple';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';
import ProductDefault from '~/components/elements/product/ProductDefault';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductInner from '~/components/elements/product/ProductInner';
import CollectionRepository from '~/repositories/CollectionRepository';
import SkeletonProduct from '@/components/elements/skeleton/SkeletonProduct';
import { generateArr } from '@/utilities/helpers';

export default {
    name: 'HomeDefaultDealOfDay',
    components: {
        SkeletonProduct,
        ProductInner,
        ProductDefault,
        CarouselArrows,
        CountDownSimple
    },
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
            skeletonItems: generateArr(6),
            productItems: null,
            loading: true,
            carouselSetting: {
                loop: true,
                slidesPerView: 6,
                spaceBetween: 15,
                scrollbar: {
                    draggable: false
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                navigation: {
                    nextEl: '.ps-deal-of-day .swiper-next',
                    prevEl: '.ps-deal-of-day .swiper-prev'
                },
                breakpoints: {
                    1680: {
                        slidesPerView: 6
                    },
                    1366: {
                        slidesPerView: 5
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
    },
    async fetch() {
        const query = {
            'slug_in': 'deal-of-the-day'
        };
        const SPProduct = await CollectionRepository.SPGetProductByCollectionSlug(query);

        if (SPProduct) {
            this.productItems = SPProduct;
        }
        setTimeout(function() {
            this.loading = false;
        }.bind(this), 250);
    }
};
</script>

<style lang="scss">
#homepage-1 {
    .ps-deal-of-day {
        .ps-carousel {
            .swiper-pagination {
                position: relative;
                top: 0;
                left: 0;
                transform: translate(0, 0);
                margin-top: 10px;
                display: block !important;

                .swiper-pagination-bullet {
                    width: 10px;
                    height: 10px;
                    cursor: pointer;
                }
            }
        }
    }
}
</style>
