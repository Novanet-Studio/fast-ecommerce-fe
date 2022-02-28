<template lang="html">
    <div class="ps-product ps-product--wide">
        <div class="ps-product__thumbnail">
            <module-product-thumbnail-image :product="product" />
        </div>
        <div class="ps-product__container">
            <div class="ps-product__content">
                <module-product-title :product="product" />
                <p class="ps-product__vendor">
                    Sold by:
                    <nuxt-link to="/shop">
                        {{ product.vendor }}
                    </nuxt-link>
                </p>
                <ul class="ps-product__desc">
                    <li>
                        Unrestrained and portable active stereo speaker
                    </li>
                    <li>Free from the confines of wires and chords</li>
                    <li>20 hours of portable capabilities</li>
                    <li>
                        Double-ended Coil Cord with 3.5mm Stereo Plugs Included
                    </li>
                    <li>3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
                </ul>
            </div>
            <div class="ps-product__shopping">
                <module-product-price :product="product" />
                <p v-if="product.sale === true" class="ps-product__price sale">
                    ${{ product.price.toFixed(2) }}
                    <del class="ml-2">
                        ${{ product.sale_price.toFixed(2) }}
                    </del>
                </p>
                <p v-else class="ps-product__price">
                    ${{ product.price.toFixed(2) }}
                </p>
                <a class="ps-btn" href="#" @click.prevent="handleAddToCart">
                    Add to cart
                </a>
                <ul class="ps-product__actions">
                    <li>
                        <a href="#" @click.prevent="handleAddItemToWishlist">
                            <i class="icon-heart"></i>
                            Wishlist
                        </a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="handleAddItemToCompare">
                            <i class="icon-chart-bars"></i>
                            Compare
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';
import ModuleProductThumbnailImage from '@/components/elements/product/modules/ModuleProductThumbnailImage';
import ModuleProductTitle from '@/components/elements/product/modules/ModuleProductTitle';
import ModuleProductPrice from '@/components/elements/product/modules/ModuleProductPrice';
export default {
    name: 'ProductWide',
    components: {
        ModuleProductPrice,
        ModuleProductTitle,
        ModuleProductThumbnailImage
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
            cartItems: state => state.cart.cartItems
        }),
        baseUrl() {
            return baseUrl;
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
        handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.title} has been added to your cart!`
            });
        },

        handleAddItemToWishlist() {
            let item = {
                id: this.product.id
            };

            this.$store.dispatch('wishlist/addItemToWishlist', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to wishlist!',
                text: `${this.product.title} has been added to your wishlist !`
            });
        },

        handleAddItemToCompare() {
            let item = {
                id: this.product.id
            };
            this.$store.dispatch('compare/addItemToCompare', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Add to Compare!',
                text: `${this.product.title} has been added to your compare !`
            });
        },

        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach(item => {
                listOfIds.push(item.id);
            });
            const response = await this.$store.dispatch(
                'product/getCartProducts',
                listOfIds
            );
            if (response) {
                this.$store.commit('cart/setLoading', false);
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
