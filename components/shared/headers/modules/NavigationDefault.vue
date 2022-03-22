<template lang="html">
    <nav class="navigation">
        <div class="ps-container">
            <!-- <div class="navigation__left">
                <div class="menu--product-categories">
                    <div class="menu__toggle">
                        <i class="icon-menu"></i>
                        <span>Compra por Sabores</span>
                    </div>
                    <div class="menu__content">
                        <menu-categories />
                    </div>
                </div>
            </div> -->
            <div class="navigation__right">
                <menu-default />
            </div>
        </div>
    </nav>
</template>

<script>
import CurrencyDropdown from './CurrencyDropdown';
import LanguageSwicher from './LanguageSwicher';
import MenuDefault from '~/components/shared/menu/MenuDefault';
import MenuCategories from '~/components/shared/menu/MenuCategories';
export default {
    name: 'NavigationDefault',
    components: {
        MenuCategories,
        MenuDefault,
        LanguageSwicher,
        CurrencyDropdown
    }
};
</script>

<style lang="scss" scoped></style>
