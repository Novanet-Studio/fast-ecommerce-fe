<template lang="html">
    <client-only>
        <v-app>
            <v-main>
                <header-default />
                <header-mobile />
                <nuxt></nuxt>
                <notify />
                <newsletters />
                <footer-default />
                <navigation-list />
                <mobile-drawer />
            </v-main>
        </v-app>
    </client-only>
</template>

<script>
import Notify from '~/components/elements/commons/notify';
import NavigationList from '~/components/shared/mobile/NavigationList';
import MobileDrawer from '~/components/shared/mobile/MobileDrawer';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import Newsletters from '~/components/partials/commons/Newsletters';
import FooterDefault from '~/components/shared/footers/FooterDefault';
export default {
    components: { FooterDefault, Newsletters, HeaderMobile, HeaderDefault, MobileDrawer, NavigationList, Notify }
};
</script>

<style lang="scss" scoped></style>
