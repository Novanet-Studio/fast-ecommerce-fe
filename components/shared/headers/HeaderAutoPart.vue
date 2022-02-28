<template lang="html">
    <header class="header header--standard header--autopart" id="headerSticky">
        <div class="header__top">
            <div class="container">
                <div class="header__left">
                    <p>
                        <strong>FREE SHIPPING</strong> for all orders over $100
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
                            <nuxt-link to="/account/order-tracking">
                                Tract your order
                            </nuxt-link>
                        </li>
                        <li>
                            <currency-dropdown />
                        </li>
                        <li>
                            <account-links />
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="header__content">
            <div class="container">
                <div class="header__content-left">
                    <nuxt-link to="/home/auto-part">
                        <a class="ps-logo">
                            <img
                                src="~/static/img/logo-autopart.png"
                                alt="martfury"
                            />
                        </a>
                    </nuxt-link>
                    <div class="menu--product-categories">
                        <div class="menu__toggle">
                            <i class="icon-menu"></i>
                            <span>Shop by Department</span>
                        </div>
                        <div class="menu__content">
                            <ul class="menu--dropdown">
                                <li>
                                    <nuxt-link to="/shop">
                                        Interior
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/shop">
                                        Wheels & Tires
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/shop">
                                        Exterior
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/shop">
                                        Performance
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/shop">
                                        Body parts
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/shop">
                                        Lighting
                                    </nuxt-link>
                                </li>
                                <li>
                                    <nuxt-link to="/shop">
                                        Accessories
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="header__content-center">
                    <search-header />
                </div>
                <div class="header__content-right">
                    <div class="header__actions">
                        <div class="ps-block--header-hotline">
                            <div class="ps-block__left">
                                <i class="icon-telephone"></i>
                            </div>
                            <div class="ps-block__right">
                                <p>
                                    Hotline
                                    <strong>1-800-234-5678</strong>
                                </p>
                            </div>
                        </div>
                        <mini-cart />
                    </div>
                </div>
            </div>
        </div>
        <nav class="navigation">
            <div class="container">
                <ul class="menu menu--technology">
                    <li v-for="menuItem in menuAutopart" :key="menuItem.text">
                        <nuxt-link :to="menuItem.url">
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
import AccountLinks from '~/components/partials/account/modules/AccountLinks';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import MiniCart from '~/components/shared/headers/modules/MiniCart';
export default {
    name: 'HeaderAutoPart',
    components: { MiniCart, SearchHeader, AccountLinks, CurrencyDropdown },
    data() {
        return {
            menuAutopart: [
                {
                    text: 'Interior',
                    url: '/shop'
                },
                {
                    text: 'Exterior',
                    url: '/shop'
                },
                {
                    text: 'Body parts',
                    url: '/shop'
                },
                {
                    text: 'Wheels & Tires',
                    url: '/shop'
                },
                {
                    text: 'Lighting',
                    url: '/shop'
                },
                {
                    text: 'Performance',
                    url: '/shop'
                },
                {
                    text: 'Repare part',
                    url: '/shop'
                },
                {
                    text: 'Tools & Garage',
                    url: '/shop'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
