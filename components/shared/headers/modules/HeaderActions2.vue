<template lang="html">
    <div class="header__actions">
        <nuxt-link to="/account/wishlist" class="header__extra">
            <i class="icon-heart"></i>
            <span>
                <i>0</i>
            </span>
        </nuxt-link>
        <mini-cart />
        <div class="ps-block--user-header">
            <div class="ps-block__left">
                <i class="icon-user"></i>
            </div>
            <div class="ps-block__right">
                <nuxt-link to="/account/login">
                    Login
                </nuxt-link>
                <nuxt-link to="/account/register">
                    Register
                </nuxt-link>
            </div>
        </div>
    </div>
</template>

<script>
import MiniCart from '~/components/shared/headers/modules/MiniCart';
import AccountLinks from '~/components/partials/account/modules/AccountLinks';
export default {
    name: 'HeaderActions2',
    components: { AccountLinks, MiniCart }
};
</script>

<style lang="scss" scoped></style>
