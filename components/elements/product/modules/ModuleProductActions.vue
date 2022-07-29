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
    </ul>
</template>

<script>

import { mapState } from 'vuex';
import HandlerActions from '~/repositories/HandlerActions';

export default {
    name: 'ModuleProductActions',
    props: {
        product: []
    },
    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems,
            currency: state => state.app.currency
        }),
    },
    methods: {
        async handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.attributes.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            let queries = [];
            this.cartItems.forEach(item => {
                queries.push(item.id);
            });
            var respuesta = await this.$store.dispatch('product/getCartProducts', queries)
            // this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'all',
                title: '¡Producto agregado!',
                text: `${this.product.attributes.name} ha sido agregado al carrito!`
            });
            // const handler = new HandlerActions()
            // handler.handleAddToCart(this.product)
            console.log(this.$cookies.get('cart'))
            console.log(this.cartItems)
            console.log(respuesta, 'desdeaqui')
        },

        handleAddItemToWishlist() {
            let item = {
                id: this.product.id
            };

            this.$store.dispatch('wishlist/addItemToWishlist', item);
            this.$notify({
                group: 'all',
                title: '¡Producto agregado!',
                text: `${this.product.attributes.name} ha sido agregado a la lista de deseos!`
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
