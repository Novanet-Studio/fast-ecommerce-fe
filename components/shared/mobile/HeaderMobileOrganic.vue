<template lang="html">
    <header class="header header--mobile organic">
        <div class="header__top">
            <div class="header__left">
                <p>Welcome to Martfury Online Shopping Store !</p>
            </div>
            <div class="header__right">
                <ul class="navigation__extra">
                    <li>
                        <nuxt-link to="/vendor/become-a-vendor">
                            Sell on Martfury
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/account/order-tracking">
                            Tract your order
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </div>
        <div class="navigation--mobile">
            <div class="navigation__left">
                <nuxt-link to="/" class="ps-logo">
                    <img src="~/static/img/logo-organic.png" alt="martfury" />
                </nuxt-link>
            </div>
            <mobile-header-actions />
        </div>
    </header>
</template>

<script>
import MobileHeaderActions from '~/components/shared/mobile/modules/MobileHeaderActions';
export default {
    name: 'HeaderMobileOrganic',
    components: { MobileHeaderActions }
};
</script>

<style lang="scss" scoped></style>
