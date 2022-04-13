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
                                    <aside-account :bread="nombreBread"/>
                                </div>
                            </div>
                            <div class="col-lg-8">
                                <nuxt></nuxt>
                            </div>
                        </div>
                    </div>
                </section>
                <notify />

            </v-main>
        </v-app>
    </client-only>
</template>

<script>
import Notify from '~/components/elements/commons/notify';
import BreadCrumb from '~/components/elements/BreadCrumb';
import AsideAccount from '~/components/partials/account/modules/AsideAccount';
import {mapGetters} from 'vuex';

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
                    text: ''
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
        const firstClick = this.links.find(item => item.url == this.$route.path )
        this.breadCrumb[1].text = firstClick.text
    },
    methods: {
        //text del breadcrumb dinamico
        nombreBread(data){
            this.breadCrumb[1].text = data;
        }
    }
};
</script>

<style lang="scss" scoped></style>
