<template lang="html">
    <header
        class="header header--standard header--market-place-1"
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
                    <nuxt-link to="/home/market-place">
                        <a class="ps-logo">
                            <img src="~/static/img/logo.png" alt="martfury" />
                        </a>
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
                </div>
                <div class="header__content-right">
                    <header-actions2 />
                </div>
            </div>
        </div>
        <nav class="navigation">
            <div class="container">
                <div class="navigation__left">
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
                <div class="navigation__right">
                    <menu-default />
                    <div class="ps-block--header-hotline inline">
                        <p>
                            <i class="icon-telephone"></i>Hotline:
                            <strong> 1-800-234-5678</strong>
                        </p>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import MenuDefault from '~/components/shared/menu/MenuDefault';
import MenuCategories from '~/components/shared/menu/MenuCategories';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import HeaderActions2 from '~/components/shared/headers/modules/HeaderActions2';
import { stickyHeader } from '~/utilities/common-helpers';
export default {
    name: 'HeaderMarketPlace',
    components: {
        HeaderActions2,
        SearchHeader,
        MenuCategories,
        MenuDefault,
        LanguageSwicher,
        CurrencyDropdown
    },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped></style>
