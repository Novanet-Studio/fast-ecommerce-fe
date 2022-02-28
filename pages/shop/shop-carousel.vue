<template lang="html">
    <div class="ps-page--shop">
        <bread-crumb :breadcrumb="breadCrumb" layout="container" />
        <div class="ps-layout--shop" id="shop-carousel">
            <div class="container">
                <shop-carousel-banner />
                <shop-carousel-top-deal
                    v-if="collections !== null"
                    collection-slug="shop-top-deals-super-hot-today"
                />
                <shop-carousel-product-box v-if="collections !== null" />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import ShopCarouselBanner from '~/components/partials/shop/sections/ShopCarouselBanner';
import ShopCarouselTopDeal from '~/components/partials/shop/sections/ShopCarouselTopDeal';
import ShopCarouselProductBox from '~/components/partials/shop/sections/ShopCarouselProductBox';

export default {
    name: 'index',
    components: {
        ShopCarouselProductBox,
        ShopCarouselTopDeal,
        ShopCarouselBanner,
        BreadCrumb
    },
    transition() {
        return 'fadeIn';
    },
    data() {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Shop carousel'
                }
            ]
        };
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            categories: state => state.product.categories,
            brands: state => state.product.brands
        })
    },

    async created() {
        const params = {
            _start: 1,
            _limit: 12
        };
        const collectionsSlug = [
            'shop-top-deals-super-hot-today',
            'best-seller-products',
            'new-arrivals-products'
        ];
        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsSlug
        );
    }
};
</script>

<style lang="scss" scoped></style>
