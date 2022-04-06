<template lang="html">
    <nav class="navigation">
        <div class="ps-container">
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
