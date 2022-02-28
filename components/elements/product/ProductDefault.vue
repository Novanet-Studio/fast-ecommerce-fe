<template lang="html">
    <div class="ps-product">
        <div class="ps-product__thumbnail">
            <module-product-thumbnail-image :product="product"/>
            <div v-if="isSale === true" class="ps-product__badge">Sale</div>
            <module-product-actions :product="product" @toParent="listenEventFromChildren"/>
        </div>
        <div class="ps-product__container">
            <nuxt-link to="/shop" class="ps-product__vendor">
                {{ product.vendor }}
            </nuxt-link>
            <div class="ps-product__content">
                <module-product-title :product="product"/>
                <div class="ps-product__rating">
                    <rating/>
                    <span>{{ product.ratingCount }}</span>
                </div>
                <module-product-price :product="product"/>
            </div>
            <div class="ps-product__content hover">
                <module-product-title :product="product"/>
                <module-product-price :product="product"/>
            </div>
        </div>
        <v-dialog v-model="quickviewDialog" width="1200">
            <div class="ps-dialog">
                <a
                    class="ps-dialog__close"
                    @click.prevent="quickviewDialog = false"
                >
                    <i class="icon icon-cross"></i>
                </a>
                <product-quickview :product="product"/>
            </div>
        </v-dialog>
    </div>
</template>
<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
import Rating from '../Rating';
import ProductQuickview from '~/components/elements/detail/ProductQuickview';
import ModuleProductTitle from '@/components/elements/product/modules/ModuleProductTitle';
import ModuleProductPrice from '@/components/elements/product/modules/ModuleProductPrice';
import ModuleProductThumbnailImage from '@/components/elements/product/modules/ModuleProductThumbnailImage';
import ModuleProductActions from '@/components/elements/product/modules/ModuleProductActions';

export default {
    components: {
        ModuleProductActions,
        ModuleProductThumbnailImage,
        ModuleProductPrice,
        ModuleProductTitle,
        ProductQuickview,
        Rating
    },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {
            }
        }
    },

    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems,
            currency: state => state.app.currency
        }),
        baseUrl() {
            return baseUrl;
        },
        isSale() {
            if (this.product.is_sale) {
                return true;
            }
            return false;
        }
    },

    data: () => ({
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false,
        quickviewDialog: false
    }),
    methods: {
        listenEventFromChildren(payload) {
            if (payload.isQuickview === true) {
                this.quickviewDialog = true;
            }
        }
    },

};
</script>
