<template lang="html">
    <ul :class="className">
        <template v-for="item in mainMenu">
            <MenuDropdown v-if="item.subMenu" :menu-data="item" />
            <MenuMega v-else-if="item.mega" :menu-data="item" />
            <li v-else :key="item.text">
                <nuxt-link :to="localePath(item.url)">
                    {{ item.text }}
                </nuxt-link>
            </li>
        </template>
    </ul>
</template>

<script>
import MenuDropdown from './MenuDropdown';
import MenuMega from './MenuMega';
export default {
    name: 'MenuDefault',
    components: { MenuMega, MenuDropdown },
    props: {
        className: {
            type: String,
            default: 'menu'
        }
    },
    data() {
        return {
            mainMenu: [
                {
                    text: 'Inicio',
                    url: '/',
                    extraClass: 'menu-item-has-children',
                    subClass: 'sub-menu',
                },
                {
                    text: 'Nosotros',
                    url: '/page/nosotros',
                    extraClass: 'menu-item-has-children',
                    subClass: 'sub-menu',
                },
                {
                    text: 'Contáctanos',
                    url: '/page/contacto',
                    extraClass: 'menu-item-has-children',
                    subClass: 'sub-menu',
                },

            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
