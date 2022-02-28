<template lang="html">
    <header
        class="header header--standard header--technology"
        id="headerSticky"
    >
        <div class="header__top">
            <div class="container">
                <div class="header__left">
                    <p>
                        SHOPPING CENTER
                        <strong class="ml-1"> for all orders over $100</strong>
                    </p>
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
                    <nuxt-link to="/home/technology" class="ps-logo">
                        <img
                            src="~/static/img/logo-technology.png"
                            alt="martfury"
                        />
                    </nuxt-link>
                    <div class="menu--product-categories">
                        <div class="menu__toggle">
                            <i class="icon-menu"></i>
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
                <ul class="menu menu--technology">
                    <li v-for="menuItem in menuTechnology" :key="menuItem.text">
                        <nuxt-link to="menuItem.url">
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
    name: 'HeaderTechnology',
    components: {
        HeaderActions2,
        SearchHeader,
        MenuCategories,
        LanguageSwicher,
        CurrencyDropdown
    },
    data() {
        return {
            menuTechnology: [
                {
                    text: 'Hot Deal',
                    url: '/home/technology',
                    icon: 'icon-star'
                },
                {
                    text: 'Smartphone',
                    url: '/home/technology',
                    icon: 'icon-smartphone'
                },
                {
                    text: 'Tablets',
                    url: '/home/technology',
                    icon: 'ion-ipad'
                },
                {
                    text: 'Laptop',
                    url: '/home/technology',
                    icon: 'icon-laptop'
                },
                {
                    text: 'Sounds',
                    url: '/home/technology',
                    icon: 'icon-headphone'
                },
                {
                    text: 'Technology Toys',
                    url: '/home/technology',
                    icon: 'icon-mic2'
                },
                {
                    text: 'Accesories',
                    url: '/home/technology',
                    icon: 'icon-headphones'
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
