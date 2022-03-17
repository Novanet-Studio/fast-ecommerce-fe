<template lang="html">
    <div class="ps-form__orders ps-block--checkout-order">
        <h3 v-if="shipping === false">Your Order</h3>
        <div class="ps-block--checkout-order">
            <div class="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Producto</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure class="ps-block__items">
                    <nuxt-link
                        v-for="(product, index) in cartProducts"
                        :to="`/product/${product.id}`"
                        :key="product.id"
                        class="ps-product__title"
                    >
                        Cachitos {{ product.name }}
                        <br />
                        {{ cartItems[index].quantity }} x ${{
                            product.price.toFixed(2)
                        }}
                    </nuxt-link>
                </figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>$ {{ amount }}</small>
                    </figcaption>
                </figure>
                <!-- <figure v-if="shipping === true">
                    <figcaption>
                        <strong>Shipping</strong>
                        <small>$ 20.00</small>
                    </figcaption>
                </figure>
                <figure v-else class="ps-block__shipping">
                    <h3>Shipping</h3>
                    <p>Calculated at next step</p>
                </figure> -->
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'ModuleOrderSummary',
    props: {
        shipping: {
            type: Boolean,
            default: () => false
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
    mounted(){
        this.loadCartProducts()
    },
    methods: {
        async loadCartProducts() {
            console.log('di click')
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
                // return console.log(response)
                if (response) {
                    this.$store.commit('cart/setLoading', false);
                }
            } else {
                this.$store.commit('product/setCartProducts', null);
            }
        },

    }
};
</script>

<style lang="scss" scoped></style>
