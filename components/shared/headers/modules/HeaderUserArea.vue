<template lang="html">
    <div v-if="!isLoggedIn" class="ps-block--user-header">
        <div class="ps-block__left">
            <i class="icon-user"></i>
        </div>
        <div class="ps-block__right">
            <nuxt-link to="/account/login">
                Iniciar Sesión
            </nuxt-link>
            <nuxt-link to="/account/register">
                Registro
            </nuxt-link>
        </div>
    </div>
    <div v-else class="ps-block--user-account">
        <i class="icon-user"></i>
        <div class="ps-block__content">
            <ul class="ps-list--arrow">
                <li v-for="link in accountLinks" :key="link.text">
                    <nuxt-link :to="link.url">
                        {{ link.text }}
                    </nuxt-link>
                </li>
                <li class="ps-block__footer">
                    <a href="#" @click.prevent="handleLogout">
                        Cerrar Sesión
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'HeaderUserArea',
    computed: {
        ...mapState({
            isLoggedIn: state => state.auth.isLoggedIn
        }), 
        ...mapGetters({
            accountLinks: 'app/getLinks'
        })
    },

    methods: {
        handleLogout() {
            this.$store.dispatch('auth/setAuthStatus', false);
        }
    }
};
</script>

<style lang="scss" scoped></style>
