<template lang="html">
    <div>
        <bread-crumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="ps-page--product">
            <div class="container">
                <product-detail-full-content />
                <!--<customer-bought
                    v-if="collections !== null"
                    layout="fullwidth"
                    collection-slug="customer_bought"
                />-->
                <related-product
                    v-if="collections !== null"
                    layout="fullwidth"
                    collection-slug="shop-recommend-items"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailFullContent from '~/components/elements/detail/ProductDetailFullContent';

export default {
    transition: 'zoom',
    components: {
        ProductDetailFullContent,
        ProductWidgets,
        RelatedProduct,
        CustomerBought,
        BreadCrumb
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            product: state => state.product.product
        })
    },
    data() {
        return {
            productId: this.$route.params.id,
            breadCrumb: null
        };
    },
    async created() {
        const queries = [
            'customer_bought',
            'shop-recommend-items',
            'widget_same_brand'
        ];
        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            queries
        );
        const product = await this.$store.dispatch(
            'product/getProductsById',
            this.productId
        );
        this.breadCrumb = [
            {
                text: 'Home',
                url: '/'
            },
            {
                text: 'Shop',
                url: '/shop'
            },
            {
                text: 'Product Affiliate'
            }
        ];
    }
};
</script>

<style lang="scss" scoped></style>
