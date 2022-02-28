<template lang="html">
    <div class="ps-product--cart-mobile">
        <div class="ps-product__thumbnail">
            <module-product-thumbnail-image :product="product" />
        </div>
        <div class="ps-product__content">
            <a
                class="ps-product__remove"
                href="#"
                @click.prevent="handleRemoveProductFromCart(product)"
            >
                <i class="icon-cross"></i>
            </a>
            <module-product-title :product="product" />
            <p>
                <strong>Sold by:</strong>
                {{ product.vendor }}
            </p>
            <small v-if="quantity !== null">
                {{ quantity }} x {{ currency }} {{ product.price }}
            </small>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
import ModuleProductThumbnailImage from '@/components/elements/product/modules/ModuleProductThumbnailImage';
import ModuleProductTitle from '@/components/elements/product/modules/ModuleProductTitle';
export default {
    name: 'ProductMiniCart',
    components: { ModuleProductTitle, ModuleProductThumbnailImage },
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        ...mapState({
            total: state => state.cart.total,
            cartItems: state => state.cart.cartItems,
            cartProducts: state => state.product.cartProducts,
            currency: state => state.app.currency
        }),
        quantity() {
            if (this.cartItems !== null) {
                const cartItem = this.cartItems.find(
                    item => item.id === this.product.id
                );
                if (cartItem !== undefined) {
                    return cartItem.quantity;
                } else {
                    return null;
                }
            } else {
                return null;
            }
        },
        baseUrl() {
            return baseUrl;
        }
    },
    methods: {
        async loadCartProducts() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            let queries = [];
            cookieCart.cartItems.forEach(item => {
                queries.push(item.id);
            });
            if (this.cartItems.length > 0) {
                const response = await this.$store.dispatch(
                    'product/getCartProducts',
                    queries
                );
                if (response) {
                    this.$store.commit('cart/setLoading', false);
                }
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },
        handleRemoveProductFromCart(product) {
            const cartItem = this.cartItems.find(
                item => item.id === product.id
            );
            this.$store.dispatch('cart/removeProductFromCart', cartItem);
            this.$store.commit('cart/setLoading', true);
            this.loadCartProducts();
        }
    }
};
</script>

<style lang="scss" scoped></style>
