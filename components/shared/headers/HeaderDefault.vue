<template lang="html">
    <header class="header header--1" data-sticky="true" id="headerSticky">
        <div class="header__top">
            <div class="ps-container">
                <div class="header__left">
                    <nuxt-link to="/" class="ps-logo">
                        <img src="/img/logo_light.png" alt="martfury" />
                    </nuxt-link>
                    <div class="menu--product-categories">
                        <div class="menu__toggle">
                            <i class="icon-menu"></i>
                            <span> {{ $t('header.shopByDepartment') }} </span>
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
                    <header-actions />
                </div>
            </div>
        </div>
        <navigation-default />
    </header>
</template>

<script>
import SearchHeader from './modules/SearchHeader';
import HeaderActions from './modules/HeaderActions';
import NavigationDefault from './modules/NavigationDefault';
import MenuCategories from '~/components/shared/menu/MenuCategories';
import { stickyHeader } from '~/utilities/common-helpers';
export default {
    name: 'HeaderDefault',
    components: {
        MenuCategories,
        NavigationDefault,
        HeaderActions,
        SearchHeader
    },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped>
.header--1 {
    .header__top {
        background-color: $color-1st;
    }
}
</style>
`
