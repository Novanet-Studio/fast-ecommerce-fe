<template lang="html">
    <nav class="navigation navbar navbar-expand-lg bg-light">
        <div class="ps-container container-fluid drop-menu-new">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
                </svg>
            </button>
            <div class="navigation__right collapse navbar-collapse" id="navbarTogglerDemo03">
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
