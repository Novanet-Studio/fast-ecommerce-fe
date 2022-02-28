<template lang="html">
    <header class="header header--organic" id="headerSticky">
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
                    <nuxt-link to="/home/organic" class="ps-logo">
                        <img
                            src="~/static/img/logo-organic.png"
                            alt="martfury"
                        />
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
                    <menu-default class-name="menu menu--organic" />
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
import MenuCategories from '~/components/shared/menu/MenuCategories';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import HeaderActions2 from '~/components/shared/headers/modules/HeaderActions2';
import MenuDefault from '~/components/shared/menu/MenuDefault';
import { stickyHeader } from '~/utilities/common-helpers';
export default {
    name: 'HeaderOrganic',
    components: { MenuDefault, HeaderActions2, SearchHeader, MenuCategories },
    mounted() {
        window.addEventListener('scroll', stickyHeader);
    }
};
</script>

<style lang="scss" scoped></style>
