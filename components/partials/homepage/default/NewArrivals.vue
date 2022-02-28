<template lang="html">
    <div class="ps-product-list ps-new-arrivals">
        <div class="ps-container">
            <div class="ps-section__header">
                <h3>
                    {{ $t('homeDefault.newArrivals.heading') }}
                </h3>
                <ul class="ps-section__links">
                    <li
                        v-for="item in newArrivalCategories"
                        :to="item.url"
                        :key="item.text"
                    >
                        <nuxt-link :to="localePath(item.url)">
                            {{ item.text }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
            <div class="ps-section__content">
                <div v-if="productItems && productItems.length > 0" class="row">
                    <template v-for="(product, index) in productItems">
                        <div
                            v-if="index < 8"
                            class="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-12 "
                            :key="product.id"
                        >
                            <product-horizontal :product="product" />
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import CollectionRepository from '@/repositories/CollectionRepository';
import { generateArr } from '@/utilities/helpers';
import ProductHorizontal from '@/components/elements/product/ProductHorizontal';

export default {
    name: 'NewArrivals',
    components: { ProductHorizontal },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        }
    },
    computed: {
        carouselSetting() {
            return carouselFullwidth;
        },
    },

    data() {
        return {
            skeletonItems: generateArr(6),
            productItems: null,
            loading: true,
            newArrivalCategories: [
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.technologies'
                    ),
                    url: '/shop',
                    active: true
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.electronic'
                    ),
                    url: '/shop',
                    active: false
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.furnitures'
                    ),
                    url: '/shop',
                    active: false
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.clothingAndApprel'
                    ),
                    url: '/shop',
                    active: false
                },
                {
                    text: this.$i18n.t(
                        'homeDefault.newArrivals.links.healthAndBeauty'
                    ),
                    url: '/shop',
                    active: false
                }
            ]
        };
    },

    async fetch() {
        const query = {
            'slug_in': this.collectionSlug
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

<style lang="scss" scoped></style>
