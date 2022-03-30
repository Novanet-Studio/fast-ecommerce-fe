<template lang="html">
    <client-only>
        <v-app>
            <v-main>
                <section class="ps-my-account ps-page--account">
                    <bread-crumb :breadcrumb="breadCrumb" />

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="ps-section__left">
                                    <aside-account/>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <nuxt></nuxt>
                            </div>
                        </div>
                    </div>
                </section>
            </v-main>
        </v-app>
    </client-only>
</template>

<script>
import Notify from '~/components/elements/commons/notify';
import BreadCrumb from '~/components/elements/BreadCrumb';
import AsideAccount from '~/components/partials/account/modules/AsideAccount.vue';

export default {
    name: 'layout-default',
    components: {
        Notify,
        BreadCrumb,
        AsideAccount
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'idk'
                }
            ]
        };
    }

};
</script>

<style lang="scss" scoped></style>
