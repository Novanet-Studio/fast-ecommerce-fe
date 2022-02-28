<template lang="html">
    <div v-if="!isLoggedIn" class="ps-block--user-header">
        <div class="ps-block__left">
            <i class="icon-user"></i>
        </div>
        <div class="ps-block__right">
            <nuxt-link to="/account/login">
                {{ $t('header.login') }}
            </nuxt-link>
            <nuxt-link to="/account/register">
                {{ $t('header.register') }}
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
                        Logout
                    </a>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'HeaderUserArea',
    computed: {
        ...mapState({
            isLoggedIn: state => state.auth.isLoggedIn
        })
    },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information'
                },
                {
                    text: 'Notifications',
                    url: '/account/notifications'
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices'
                },
                {
                    text: 'Address',
                    url: '/account/addresses'
                },
                {
                    text: 'Recent Viewed Product',
                    url: '/account/recent-viewed-product'
                },
                {
                    text: 'Wishlist',
                    url: '/account/wishlist'
                }
            ]
        };
    },
    methods: {
        handleLogout() {
            this.$store.dispatch('auth/setAuthStatus', false);
        }
    }
};
</script>

<style lang="scss" scoped></style>
