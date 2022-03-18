<template>
    <td data-label="Total">
        ${{
            (quantity* product.price).toFixed(2)
        }}
    </td>

</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'TotalQuantity',
    props: {
        product: {
            Type: Object,
            default: {}
        },
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
}

</script>

<style lang="scss" scoped>

</style>