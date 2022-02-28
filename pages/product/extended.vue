<template lang="html">
    <div>
        <bread-crumb :breadcrumb="breadCrumb" />
        <div class="ps-page--product">
            <div class="container">
                <div class="ps-page__container">
                    <div class="ps-page__left">
                        <product-detail-extended />
                    </div>
                    <div class="ps-page__right">
                        <product-widgets
                            v-if="collections !== null"
                            collection-slug="widget_same_brand"
                        />
                    </div>
                </div>
                <!--<customer-bought
                    v-if="collections !== null"
                    collection-slug="customer_bought"
                />-->
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
import BreadCrumb from '~/components/elements/BreadCrumb';
import CustomerBought from '~/components/partials/product/CustomerBought';
import RelatedProduct from '~/components/partials/product/RelatedProduct';
import ProductWidgets from '~/components/partials/product/ProductWidgets';
import ProductDetailExtended from '~/components/elements/detail/ProductDetailExtended';
export default {
    transition: 'zoom',
    components: {
        ProductDetailExtended,
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
                text: 'Product Extended'
            }
        ];
    }
};
</script>

<style lang="scss" scoped></style>
