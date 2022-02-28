<template lang="html">
    <ul class="ps-product__actions">
        <li>
            <a
                to="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Add to cart"
                @click.prevent="handleAddToCart"
            >
                <i class="icon-bag2"></i>
            </a>
        </li>
        <li>
            <a
                to="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Quick View"
                @click.prevent="handleOpenQuickviewDialog"
            >
                <i class="icon-eye"></i>
            </a>
        </li>
        <li>
            <a
                href="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Add to wishlist"
                @click.prevent="handleAddItemToWishlist"
            >
                <i class="icon-heart"></i>
            </a>
        </li>
        <li>
            <a
                to="#"
                data-toggle="tooltip"
                data-placement="top"
                title="Compare"
                @click.prevent="handleAddItemToCompare"
            >
                <i class="icon-chart-bars"></i>
            </a>
        </li>
    </ul>
</template>

<script>

import { mapState } from 'vuex';

export default {
    name: 'ModuleProductActions',
    props: {
        product: {
            type: Object,
            default: () => {
            }
        }
    },
    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems,
            currency: state => state.app.currency
        }),
    },
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
                title: 'Add to compare!',
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
        },

        handleOpenQuickviewDialog() {
            const payload = {
                isQuickview: true
            }
            this.$emit('toParent', payload)
        }
    }
};
</script>

<style lang="scss" scoped>

</style>
