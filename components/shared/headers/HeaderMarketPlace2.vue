<template lang="html">
    <header
        class="header header--standard header--market-place-2"
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
                    <nuxt-link to="/home/market-place-2" class="ps-logo">
                        <img src="~/static/img/logo.png" alt="martfury" />
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
        <nav class="navigation">
            <div class="container">
                <ul class="menu menu--market-2">
                    <li v-for="menuItem in menuMarket2" :key="menuItem.text">
                        <nuxt-link :to="menuItem.url">
                            <i class="{menuItem.icon}"></i>
                            {{ menuItem.text }}
                        </nuxt-link>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import MenuCategories from '~/components/shared/menu/MenuCategories';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import HeaderActions2 from '~/components/shared/headers/modules/HeaderActions2';
import { stickyHeader } from '~/utilities/common-helpers';
export default {
    name: 'HeaderMarketPlace2',
    components: {
        HeaderActions2,
        SearchHeader,
        MenuCategories,
        LanguageSwicher,
        CurrencyDropdown
    },
    data() {
        return {
            menuMarket2: [
                {
                    text: 'All Categories',
                    url: '/shop'
                },
                {
                    text: 'Today Deals',
                    url: '/shop'
                },
                {
                    text: 'Electronics',
                    url: '/shop'
                },
                {
                    text: 'Clothing',
                    url: '/shop'
                },
                {
                    text: 'Computers',
                    url: '/shop'
                },
                {
                    text: 'Furnitures',
                    url: '/shop'
                },
                {
                    text: 'Mom & baby',
                    url: '/shop'
                },
                {
                    text: 'Book & More',
                    url: '/shop'
                }
            ]
        };
    },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped></style>
