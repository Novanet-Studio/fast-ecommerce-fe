<template lang="html">
    <div class="martfury">
        <bread-crumb :breadcrumb="breadCrumb" layout="fullwidth" />
        <div class="ps-page--product">
            <div class="ps-container">
                <div class="ps-page__container">
                    <div class="ps-page__left">
                        <product-detail-fullwidth v-if="product !== null"  :product="product"/>
                    </div>
                    <div class="ps-page__right">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductoRepository from '~/repositories/ProductoRepository';
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
    data() {
        return {
            productId: this.$route.params.id,
            breadCrumb: null,
            pageLoading: true,
            product: {
                Type: Object,
                default: {}
            },
        }
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            // product: state => state.product.product
        }),
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
                // text: this.product.name
            }
        ];
    },
    async mounted() {
        this.$store.commit('app/setAppDrawer', false);
        this.product =  await this.producto();

        // console.log(this.product)
    },
    methods: {
        async producto(){
            const productoPorId = new ProductoRepository();
            // return console.log(await productoPorId.GetProductById(this.productId).then(val=>{return this.product = val}));
            // return await productoPorId.GetProductById(this.productId);
            return await productoPorId.GetProductById(this.productId).then(val=>{return val});
        }
    }
};
</script>

<style lang="scss" scoped></style>
