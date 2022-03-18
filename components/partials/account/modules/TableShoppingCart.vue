<template lang="html">
    <table class="table ps-table--responsive ps-table--shopping-cart">
        <thead>
            <tr>
                <th>Product0</th>
                <th>Precio</th>
                <th>Cantidad</th>
                <th>Total</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(product, index) in cartProducts" :key="product.id">
                <td data-label="Product">
                    <product-shopping-cart :product="product" />
                </td>
                <td data-label="Price" class="price">$ {{ product.price }}</td>
                <td data-label="Quantity">
                    <quantity :product="product"/>
                </td>
                <total-quantity :product="product" />
                <td data-label="Action">
                    <a
                        href="#"
                        @click.prevent="handleRemoveProductFromCart(product)"
                    >
                        <i class="icon-cross"></i>
                    </a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import { mapState } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';
import Quantity from '~/components/partials/account/modules/Quantity';
import TotalQuantity from '~/components/partials/account/modules/TotalQuantity';

export default {
    name: 'TableShoppingCart',
    components: { ProductShoppingCart, Quantity, TotalQuantity },
    data(){
        return {
            // cartProducts: ''
        }
    },
    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems,
            total: state => state.cart.total,
            amount: state => state.cart.amount,
            cartProducts: state => state.product.cartProducts
        })
    },
    methods: {
        async loadCartProducts() {
            const cookieCart = this.$cookies.get('cart', { parseJSON: true });
            let queries = [];
            cookieCart.cartItems.forEach(item => {
                queries.push(item.id);
            });
            // return console.log(queries);
            if (this.cartItems.length > 0) {
                // await this.$store.dispatch('product/getCartProducts', queries);
                await this.$store.dispatch('product/getCartProducts', queries);
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },
        handleRemoveProductFromCart(product) {
            const cartItem = this.cartItems.find(
                item => item.id === product.id
            );
            this.$store.dispatch('cart/removeProductFromCart', cartItem);
            this.loadCartProducts();
            return console.log(this.cartItems)
        },

    }
};
</script>

<style lang="scss" scoped></style>
