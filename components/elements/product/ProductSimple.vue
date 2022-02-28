<template lang="html">
    <div class="ps-product ps-product--simple">
        <div class="ps-product__thumbnail">
            <module-product-thumbnail-image :product="product" />
            <module-product-actions :product="product" />
        </div>
        <div class="ps-product__container">
            <nuxt-link to="/shop">
                <a class="ps-product__vendor">{{ product.vendor }}</a>
            </nuxt-link>
            <div class="ps-product__content">
                <module-product-title :product="product" />
                <div class="ps-product__rating">
                    <Rating />
                    <span>{{ product.ratingCount }}</span>
                </div>
                <module-product-price :product="product" />
            </div>
        </div>
    </div>
</template>

<script>
import { baseUrl } from '../../../repositories/Repository';
import Rating from '../Rating';
import { mapState } from 'vuex';
import ModuleProductThumbnailImage from '@/components/elements/product/modules/ModuleProductThumbnailImage';
import ModuleProductActions from '@/components/elements/product/modules/ModuleProductActions';
import ModuleProductTitle from '@/components/elements/product/modules/ModuleProductTitle';
import ModuleProductPrice from '@/components/elements/product/modules/ModuleProductPrice';

export default {
    name: 'ProductSimple',
    components: {
        ModuleProductPrice,
        ModuleProductTitle,
        ModuleProductActions,
        ModuleProductThumbnailImage,
        Rating
    },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {}
        }
    },

    computed: {
        ...mapState({
            currency: state => state.app.currency
        }),
        baseUrl() {
            return baseUrl;
        }
    },
    data: () => ({
        productRating: 5,
        productModal: false,
        productPreload: true,
        isImageLoaded: false
    }),

    methods: {
        handleAddToCart() {
            let item = this.product;
            item.quantity = 1;
            this.$store.commit('cart/addItem', { ...item });
            this.$notify({
                group: 'cartAddItem',
                title: 'Success!',
                text: `${this.product.name} has been added to your cart!`
            });
        },

        clean(group) {
            this.$notify({ group, clean: true });
        }
    }
};
</script>
