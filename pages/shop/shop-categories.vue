<template lang="html">
    <div class="ps-page--shop">
        <bread-crumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="ps-layout--shop" id="shop-categories">
            <div class="container">
                <catalog-top />
                <categories-best-seller
                    v-if="collections !== null"
                    collection-slug="shop-best-seller-items"
                />
                <categories-recommend-items
                    v-if="collections !== null"
                    collection-slug="shop-recommend-items"
                />
                <category-box-consummer-electronics />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CatalogTop from '~/components/partials/shop/sections/CatalogTop';
import CategoriesBestSeller from '~/components/partials/shop/sections/CategoriesBestSeller';
import CategoriesRecommendItems from '~/components/partials/shop/sections/CategoriesRecommendItems';
import CategoryBoxConsummerElectronics from '~/components/partials/shop/sections/CategoryBoxConsummerElectronics';

export default {
    name: 'shop-categories',
    components: {
        CategoryBoxConsummerElectronics,
        CategoriesRecommendItems,
        CategoriesBestSeller,
        CatalogTop,
        BreadCrumb,
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
        const collectionsSlug = [
            'shop-best-seller-items',
            'shop-recommend-items'
        ];
        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsSlug
        );
    }
};
</script>

<style lang="scss" scoped></style>
