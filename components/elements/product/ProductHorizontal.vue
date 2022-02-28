<template lang="html">
    <div class="ps-product--horizontal">
        <div class="ps-product__thumbnail">
            <module-product-thumbnail-image :product="product" />
        </div>
        <div class="ps-product__content">
            <module-product-title :product="product" />
            <div class="ps-product__rating">
                <rating />
                <span>{{ product.ratingCount }}</span>
            </div>
            <module-product-price :product="product" />
        </div>
    </div>
</template>

<script>
import Rating from '../Rating';
import { baseUrl } from '~/repositories/Repository';
import { mapState } from 'vuex';
import ModuleProductTitle from '@/components/elements/product/modules/ModuleProductTitle';
import ModuleProductPrice from '@/components/elements/product/modules/ModuleProductPrice';
import ModuleProductThumbnailImage from '@/components/elements/product/modules/ModuleProductThumbnailImage';

export default {
    components: { ModuleProductThumbnailImage, ModuleProductPrice, ModuleProductTitle, Rating },
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
        }
    }
};
</script>
