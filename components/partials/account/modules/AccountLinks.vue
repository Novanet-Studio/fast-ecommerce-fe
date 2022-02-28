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
                    Logout
                </a>
            </nuxt-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: 'AccountLinks',
    props: {
        links: {
            type: Array,
            default: () => []
        }
    }
};
</script>

<style lang="scss" scoped></style>
