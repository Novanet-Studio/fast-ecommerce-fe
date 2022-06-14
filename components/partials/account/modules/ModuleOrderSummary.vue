<template lang="html">
    <div v-if="cartItems.length > 0" class="ps-form__orders ps-block--checkout-order" id="orden-resume">
        <h3 v-if="shipping === false">Tu Orden</h3>
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
                        v-for="(product, index) in cartProducts.data"
                        :to="`/product/${product.id}`"
                        :key="product.id"
                        class="ps-product__title"
                    >
                        Cachitos {{ product.attributes.name }}
                        <br />
                        {{ cartItems[index].quantity }} x ${{
                            product.attributes.price.toFixed(2)
                        }}
                    </nuxt-link>
                </figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>$ {{ amount }}</small>
                    </figcaption>
                </figure>
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
        console.log('los item en el summary',this.cartItems)
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

            console.log('item del cart full', this.cartProducts)
        },

    }
};
</script>

<style lang="scss" scoped></style>
