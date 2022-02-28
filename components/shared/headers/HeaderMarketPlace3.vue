<template lang="html">
    <header class="header  header--market-place-3" id="headerSticky">
        <div class="header__top">
            <div class="container">
                <div class="header__left">
                    <div class="menu--product-categories">
                        <div class="menu__toggle">
                            <i class="icon-menu"></i>
                            <span> Shop by Department</span>
                        </div>
                        <div class="menu__content">
                            <menu-categories />
                        </div>
                    </div>
                    <nuxt-link to="/home/market-place-3" class="ps-logo">
                        <img src="~/static/img/logo_light.png" alt="martfury" />
                    </nuxt-link>
                </div>
                <div class="header__center">
                    <search-header />
                </div>
                <div class="header__right">
                    <header-actions2 />
                </div>
            </div>
        </div>
        <nav class="navigation">
            <div class="container">
                <div class="navigation__left">
                    <div class="menu--product-categories">
                        <div class="menu__toggle active">
                            <i class="icon-menu"></i>
                            <span> Shop by Department</span>
                        </div>
                        <div class="menu__content">
                            <menu-categories />
                        </div>
                    </div>
                </div>
                <div class="navigation__right">
                    <ul class="menu menu--recent-view">
                        <li class="menu-item-has-children">
                            <nuxt-link to="/page/blank">
                                Your Recently Viewed
                            </nuxt-link>
                            <div class="navigation__recent-products">
                                <p>
                                    <nuxt-link to="/page/blank">
                                        See all your recently viewed items
                                    </nuxt-link>
                                </p>
                            </div>
                        </li>
                    </ul>
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
                        <li>
                            <currency-dropdown />
                        </li>
                        <li>
                            <language-swicher />
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import HeaderActions2 from '~/components/shared/headers/modules/HeaderActions2';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import { stickyHeader } from '~/utilities/common-helpers';
import MenuCategories from '~/components/shared/menu/MenuCategories';
export default {
    name: 'HeaderMarketPlace3',
    components: {
        MenuCategories,
        LanguageSwicher,
        CurrencyDropdown,
        HeaderActions2,
        SearchHeader
    },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped></style>
