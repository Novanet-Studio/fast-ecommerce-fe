<template lang="html">
    <div class="header__actions">
        <nuxt-link to="/account/compare">
            <a class="header__extra">
                <i class="icon-chart-bars"></i>
                <span>
                    <i>{{ compareTotal ? compareTotal : 0 }}</i>
                </span>
            </a>
        </nuxt-link>
        <nuxt-link to="/account/wishlist">
            <a class="header__extra">
                <i class="icon-heart"></i>
                <span>
                    <i>{{ wishlistTotal ? wishlistTotal : 0 }}</i>
                </span>
            </a>
        </nuxt-link>
        <mini-cart />
        <header-user-area />
    </div>
</template>

<script>
import MiniCart from './MiniCart';
import { mapState } from 'vuex';
import HeaderUserArea from '~/components/shared/headers/modules/HeaderUserArea';
export default {
    name: 'HeaderActions',
    components: { HeaderUserArea, MiniCart },
    computed: {
        ...mapState({
            total: state => state.cart.total,
            wishlistTotal: state => state.wishlist.total,
            compareTotal: state => state.compare.total
        })
    }
};
</script>

<style lang="scss" scoped></style>
