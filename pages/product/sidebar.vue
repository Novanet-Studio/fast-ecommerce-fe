<template lang="html">
    <div>
        <bread-crumb :breadcrumb="breadCrumb" layout="container" />
        <div class="ps-page--product reverse">
            <div class="container">
                <div class="ps-page__container">
                    <div class="ps-page__left">
                        <product-detail-sidebar />
                    </div>
                    <div class="ps-page__right">
                        <product-widgets
                            v-if="collections !== null"
                            collection-slug="widget_same_brand"
                        />
                    </div>
                </div>
                <related-product
                    v-if="collections !== null"
                    collection-slug="shop-recommend-items"
                />
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailCountDown from '~/components/elements/detail/ProductDetailCountdown';
import ProductDetailGroupped from '~/components/elements/detail/ProductDetailGroupped';
import ProductOnsalePage from '~/pages/product/on-sale';
import ProductDetailOnSale from '~/components/elements/detail/ProductDetailOnSale';
import ProductDetailSidebar from '~/components/elements/detail/ProductDetailSidebar';
export default {
    transition: 'zoom',
    components: {
        ProductDetailSidebar,
        ProductDetailOnSale,
        ProductOnsalePage,
        ProductDetailGroupped,
        ProductDetailCountDown,
        ProductWidgets,
        RelatedProduct,
        CustomerBought,
        BreadCrumb,
        ProductDetailFullwidth
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
