<template lang="html">
    <header
        class="header header--standard header--electronic"
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
                    <nuxt-link to="/home/electronic" class="ps-logo">
                        <img
                            src="~/static/img/logo-electronic.png"
                            alt="martfury"
                        />
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
                <ul class="menu menu--electronic">
                    <li v-for="menuItem in menuElectronic" :key="menuItem.text">
                        <nuxt-link to="menuItem.url">
                            <i :class="menuItem.icon"></i>
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
    name: 'HeaderElectronic',
    components: {
        HeaderActions2,
        SearchHeader,
        MenuCategories,
        LanguageSwicher,
        CurrencyDropdown
    },
    data() {
        return {
            menuElectronic: [
                {
                    text: 'Hot Deal',
                    url: '/shop',
                    icon: 'icon-star'
                },
                {
                    text: 'Home Electronics',
                    url: '/shop',
                    icon: 'icon-laundry'
                },
                {
                    text: 'Computer & Technology',
                    url: '/shop',
                    icon: 'icon-laptop'
                },
                {
                    text: 'Camera & Videos',
                    url: '/shop',
                    icon: 'icon-camera2'
                },
                {
                    text: 'Office Electronics',
                    url: '/shop',
                    icon: 'icon-surveillance'
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
