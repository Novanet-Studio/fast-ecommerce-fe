<template lang="html">
    <ul>
        <template v-for="link in links">
            <li :key="link.text" :class="link.active ? 'active' : ''">
                <nuxt-link :to="link.url">
                    <i :class="link.icon"></i>
                    {{ link.text }}
                </nuxt-link>
            </li>
        </template>
        <li>
            <nuxt-link to="/account/my-account">
                <a>
                    <i class="icon-power-switch"></i>
                    Cerrar Sesión
                </a>
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
    name: 'AccountLinks',
    computed: {
        ...mapGetters({
            links: 'app/getLinks'
        })
    },
    mounted(){
        console.log(this.links)
    }

};
</script>

<style lang="scss" scoped></style>
