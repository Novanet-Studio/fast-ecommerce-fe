<template lang="html">
    <div class="ps-page--shop" id="shop-sidebar">
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="container">
            <div class="ps-layout--shop">
                <div class="ps-layout__left">
                    <shop-widget
                        v-if="categories !== null && brands !== null"
                    />
                </div>

                <div class="ps-layout__right">
                    <search-result />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import LayoutShop from '~/components/partials/shop/LayoutShop';
import SearchResult from '~/components/partials/search/SearchResult';
import ShopWidget from '~/components/partials/shop/modules/ShopWidget';

export default {
    transition() {
        return 'fadeIn';
    },
    components: {
        ShopWidget,
        SearchResult,
        LayoutShop,
        BreadCrumb
    },

    computed: {
        ...mapState({
            searchResults: state => state.product.searchResults,
            collections: state => state.collection.collections,
            categories: state => state.product.categories,
            brands: state => state.product.brands
        }),
        keyword() {
            return this.$route.query.keyword;
        }
    },

    data() {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Search Result'
                }
            ]
        };
    },

    async created() {
        await this.$store.dispatch('product/getProductByKeyword', {
            title_contains: this.keyword
        });
        const params = {
            _start: 1,
            _limit: 12
        };
        const collectionsParams = [
            'shop_best_sale_items',
            'shop-recommend-items'
        ];
        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsParams
        );
        const products = await this.$store.dispatch(
            'product/getProducts',
            params
        );
        const brands = await this.$store.dispatch(
            'product/getProductBrands',
            params
        );
        const categories = await this.$store.dispatch(
            'product/getProductCategories',
            params
        );
    }
};
</script>

<style lang="scss" scoped></style>
