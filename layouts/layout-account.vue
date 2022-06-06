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

                <section class="ps-my-account ps-page--account">
                    <!-- <bread-crumb :breadcrumb="breadCrumb" /> -->

                    <div class="container">
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="ps-section__left">
                                    <aside-account :bread="nombreBread"/>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <nuxt></nuxt>
                            </div>
                        </div>
                    </div>
                </section>
                <footer-fullwidth />
                <notify />

            </v-main>
        </v-app>
    </client-only>
</template>

<script>
import Notify from '~/components/elements/commons/notify';
import BreadCrumb from '~/components/elements/BreadCrumb';
import AsideAccount from '~/components/partials/account/modules/AsideAccount';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import NavigationList from '~/components/shared/mobile/NavigationList';
import MobileDrawer from '~/components/shared/mobile/MobileDrawer';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

import {mapGetters} from 'vuex';

export default {
    name: 'layout-account',
    components: {
        Notify,
        BreadCrumb,
        AsideAccount,
        HeaderDefault,
        FooterFullwidth
    },
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'asereje'
                }
            ]
        }
    },
    computed: {
        ...mapGetters({
            links: 'app/getLinks'
        })
    },
    mounted(){
        //mostrando el nombre del enlace que dio click en el home page
        console.log('==> el; bread', this.breadCrumb)
        console.log('==> idk', this.$router.apps[0]._route.path)
        var firstClick;
        if(this.$router.apps[0]._route.path !== '/account/shopping-cart' || this.$router.apps[0]._route.path !== '/account/checkout'){
            firstClick = this.links.find(item => item.url == this.$route.path )
            this.breadCrumb[1].text = firstClick.text
        }
        console.log('click', firstClick)
    },
    methods: {
        //text del breadcrumb dinamico
        nombreBread(data){
            if(this.$router.apps[0]._route.path !== '/account/shopping-cart' || this.$router.apps[0]._route.path !== '/account/checkout'){

            this.breadCrumb[1].text = data;
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
