<template lang="html">
    <header
        class="header header--standard header--market-place-4"
        id="headerSticky"
    >
        <div class="header__top">
            <div class="container">
                <div class="header__left">
                    <p>Welcome to Martfury Online Shopping Store !</p>
                </div>
                <div class="header__right">
                    <ul class="header__top-links">
                        <li>
                            <nuxt-link to="/vendor/store-list">
                                Store Location
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/page/blank">
                                Track Your Order
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
        </div>
        <div class="header__content">
            <div class="container">
                <div class="header__content-left">
                    <nuxt-link to="/home/market-place-4" class="ps-logo">
                        <img src="~/static/img/logo_light.png" alt="martfury" />
                    </nuxt-link>
                    <div class="menu--product-categories">
                        <div class="menu__toggle">
                            <i class="icon-menu"></i>
                            <span> Shop by Department</span>
                        </div>
                        <div class="menu__content">
                            <menu-categories />
                        </div>
                    </div>
                </div>
                <div class="header__content-center">
                    <search-header />
                    <p>
                        <nuxt-link to="/shop">
                            iphone x
                        </nuxt-link>
                        <nuxt-link to="/shop">
                            virtual
                        </nuxt-link>
                        <nuxt-link to="/shop">
                            apple
                        </nuxt-link>
                        <nuxt-link to="/shop">
                            wireless
                        </nuxt-link>
                        <nuxt-link to="/shop">
                            simple chair
                        </nuxt-link>
                        <nuxt-link to="/shop">
                            classic watch
                        </nuxt-link>
                        <nuxt-link to="/shop">
                            macbook
                        </nuxt-link>
                    </p>
                </div>
                <div class="header__content-right">
                    <header-actions2 />
                </div>
            </div>
        </div>
    </header>
</template>

<script>
import HeaderActions2 from '~/components/shared/headers/modules/HeaderActions2';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import MenuCategories from '~/components/shared/menu/MenuCategories';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import { stickyHeader } from '~/utilities/common-helpers';
export default {
    name: 'HeaderMarketPlace4',
    components: {
        LanguageSwicher,
        CurrencyDropdown,
        MenuCategories,
        SearchHeader,
        HeaderActions2
    },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped></style>
