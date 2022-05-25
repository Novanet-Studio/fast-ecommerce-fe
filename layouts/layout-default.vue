<template lang="html">
    <client-only>
        <v-app>
            <v-main>
                <notifications
                    group="all"
                    :duration="2000"
                    :width="300"
                    animation-name="fade-left"
                    position="top right"
                >
                    <template slot="body" slot-scope="props">
                        <div class="ps-notify" :class="props.className">
                            <button class="ps-notify__close" @click="props.close">
                                <i class="icon icon-cross"></i>
                            </button>
                            <div class="ps-notify__header">
                                <span>{{ props.item.title }}</span>
                            </div>
                            <div class="ps-notify__content">
                                <p>{{ props.item.text }}</p>
                            </div>
                        </div>
                    </template>
                </notifications>
                <header-default />
                <nuxt />
                <footer-fullwidth />
                <navigation-list />
                <mobile-drawer />
                <notify />
            </v-main>
        </v-app>
    </client-only>
</template>

<script>
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import NavigationList from '~/components/shared/mobile/NavigationList';
import MobileDrawer from '~/components/shared/mobile/MobileDrawer';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import Notify from '~/components/elements/commons/notify';
export default {
    name: 'layout-default',
    components: {
        FooterFullwidth,
        MobileDrawer,
        NavigationList,
        HeaderDefault,
        Notify
    }
};
</script>

<style lang="scss" scoped></style>
