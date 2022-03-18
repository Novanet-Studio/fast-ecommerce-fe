<template lang="html">
    <div class="form-group--number">
        <button class="up" @click.prevent="handleIncreaseQuantity">
            <i class="fa fa-plus"></i>
        </button>
        <button class="down" @click.prevent="handleDescreaseQuantity">
            <i class="fa fa-minus"></i>
        </button>
        <input
            v-model="quantity"
            class="form-control"
            type="text"
            disabled
        />
    </div>






</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Quantity',
    props: {
        product: {
            Type: Object,
            default: {}
        },
        // quantity: '',
    },

    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems
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

    },
    methods: {
        async handleIncreaseQuantity() {
            const updateQuantity = await this.$store.dispatch('cart/increaseCartItemQuantity', this.product)

            console.log(updateQuantity)
        },

        async handleDescreaseQuantity() {
            const updateQuantity = await this.$store.dispatch('cart/decreaseCartItemQuantity', this.product)

            console.log(updateQuantity)

        },
    }
};
</script>

<style lang="scss" scoped></style>
