<template lang="html">
    <ul>
        <template v-for="link in links">
            <li :key="link.text" :class="link.active ? 'active' : '' " @click="idk(link.text)" >
                <nuxt-link :to="link.url">
                    <i :class="link.icon"></i>
                    {{ link.text }}
                </nuxt-link>
            </li>
        </template>
        <li>
            <a href="#" @click.prevent="handleLogout">
                <i class="icon-power-switch"></i>
                Cerrar Sesión
            </a>
            
        </li>
    </ul>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'AccountLinks',
    props: [
        'breadinfo'
    ],
    computed: {
        ...mapGetters({
            links: 'app/getLinks'
        })
    },
    methods: {
        idk(name){
            const nameLink = name;
            this.breadinfo(nameLink)
        },
        handleLogout() {
            this.$store.dispatch('auth/setAuthStatus', false);
            this.$router.push('/');
        }
    }

};
</script>

<style lang="scss" scoped></style>
