<template lang="html">
    <div class="martfury">
        <bread-crumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="ps-page--product">
            <div class="ps-container">
                <div class="ps-page__container">
                    <div class="ps-page__left">
                        <product-detail-fullwidth v-if="product !== null" />
                    </div>
                    <div class="ps-page__right">
                        <product-widgets
                            v-if="collections !== null"
                            collection-slug="widget_same_brand"
                        />
                    </div>
                </div>
                <customer-bought
                    v-if="collections !== null"
                    layout="fullwidth"
                    collection-slug="customer_bought"
                />
                <related-product
                    v-if="collections !== null"
                    layout="fullwidth"
                    collection-slug="shop-recommend-items"
                />
            </div>
        </div>
        <newsletters layout="fullwidth"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDetailFullwidth from '~/components/elements/detail/ProductDetailFullwidth';
import BreadCrumb from '~/components/elements/BreadCrumb';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import LayoutProduct from '~/layouts/layout-product';
import Newsletters from '~/components/partials/commons/Newsletters';
export default {
    layout: 'layout-product',
    transition: 'zoom',
    components: {
        Newsletters,
        LayoutProduct,
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
            breadCrumb: null,
            pageLoading: true
        };
    },
    async created() {
        const queries = [
            'customer_bought',
            'shop-recommend-items',
            'widget_same_brand'
        ];
        setTimeout(
            function() {
                this.pageLoading = false;
            }.bind(this),
            2000
        );
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
                text: product.title
            }
        ];
    },
    mounted() {
        this.$store.commit('app/setAppDrawer', false);
    }
};
</script>

<style lang="scss" scoped></style>
