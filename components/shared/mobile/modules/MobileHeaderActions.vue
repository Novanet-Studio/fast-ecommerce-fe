<template lang="html">
    <div class="navigation__right">
        <nuxt-link to="/account/shopping-cart" class="header__extra">
            <i class="icon-bag2"></i>
            <span>
                <i>{{ total }}</i>
            </span>
        </nuxt-link>
        <nuxt-link to="/account/login" class="header__extra">
            <i class="icon-user"></i>
        </nuxt-link>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { baseUrl } from '~/repositories/Repository';

export default {
    name: 'MobileHeaderActions',
    computed: {
        ...mapState({
            total: state => state.cart.total,
            amount: state => state.cart.amount,
            loading: state => state.cart.loading,
            cartItems: state => state.cart.cartItems,
            cartProducts: state => state.product.cartProducts
        }),
        baseUrl() {
            return baseUrl;
        }
    }


};
</script>

<style lang="scss" scoped></style>
