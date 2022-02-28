<template lang="html">
    <nav class="navigation">
        <div class="ps-container">
            <div class="navigation__left">
                <div class="menu--product-categories">
                    <div class="menu__toggle">
                        <i class="icon-menu"></i>
                        <span> {{ $t('header.shopByDepartment') }}</span>
                    </div>
                    <div class="menu__content">
                        <menu-categories />
                    </div>
                </div>
            </div>
            <div class="navigation__right">
                <menu-default />
                <ul class="navigation__extra">
                    <li>
                        <nuxt-link to="/vendor/become-a-vendor">
                            {{ $t('header.navigationExtra.sellOnMartfury') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <nuxt-link to="/account/order-tracking">
                            {{ $t('header.navigationExtra.trackYourOrder') }}
                        </nuxt-link>
                    </li>
                    <li>
                        <CurrencyDropdown />
                    </li>
                    <li>
                        <LanguageSwicher />
                    </li>
                </ul>
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
