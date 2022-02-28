<template lang="html">
    <section class="ps-shop-carousel--product-box">
        <div class="ps-product-list">
            <div class="ps-section__header">
                <h3>Best Seller In The Last Months</h3>
            </div>
            <div class="ps-section__content">
                <best-seller-in-last-month :products="bestSellerProducts" />
            </div>
        </div>
        <div class="ps-product-list">
            <div class="ps-section__header">
                <h3>New Arrivals</h3>
            </div>
            <div class="ps-section__content">
                <shop-carousel-new-arrivals-products
                    :products="newArrivalsProducts"
                />
            </div>
        </div>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductDefault from '~/components/elements/product/ProductDefault';
import BestSellerInLastMonth from '~/components/partials/shop/modules/BestSellerInLastMonth';
import ShopCarouselNewArrivalsProducts from '~/components/partials/shop/modules/ShopCarouselNewArrivalsProducts';

export default {
    name: 'ShopCarouselProductBox',
    components: {
        ShopCarouselNewArrivalsProducts,
        BestSellerInLastMonth,
        ProductDefault
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
        carouselSetting() {
            return carouselFullwidth;
        },

        bestSellerProducts() {
            return getColletionBySlug(this.collections, 'best-seller-products');
        },
        newArrivalsProducts() {
            return getColletionBySlug(
                this.collections,
                'new-arrivals-products'
            );
        }
    }
};
</script>

<style lang="scss" scoped></style>
