<template lang="html">
    <header class="header header--furniture" id="headerSticky">
        <div class="header__top">
            <div class="container">
                <div class="header__left">
                    <nuxt-link to="/home/furniture" class="ps-logo">
                        <img
                            src="~/static/img/logo-furniture.png"
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
                    <menu-default class="menu menu--furniture" />
                </div>
                <div class="navigation__right">
                    <ul class="navigation__extra">
                        <li>
                            <nuxt-link to="/page/blank">
                                Sell on Martfury
                            </nuxt-link>
                        </li>
                        <li>
                            <nuxt-link to="/page/blank">
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
import HeaderActions2 from '~/components/shared/headers/modules/HeaderActions2';
import MenuCategories from '~/components/shared/menu/MenuCategories';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import MenuDefault from '~/components/shared/menu/MenuDefault';
import CurrencyDropdown from '~/components/shared/headers/modules/CurrencyDropdown';
import LanguageSwicher from '~/components/shared/headers/modules/LanguageSwicher';
import { stickyHeader } from '~/utilities/common-helpers';
export default {
    name: 'HeaderFurniture',
    components: {
        LanguageSwicher,
        CurrencyDropdown,
        MenuDefault,
        SearchHeader,
        MenuCategories,
        HeaderActions2
    },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped></style>
