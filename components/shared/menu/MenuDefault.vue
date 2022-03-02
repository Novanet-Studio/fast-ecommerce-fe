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
                    // subMenu: [
                    // ]
                },
                {
                    text: 'Sabores',
                    url: '/shop',
                    extraClass: 'menu-item-has-children has-mega-menu',
                    subClass: 'sub-menu',
                    mega: 'true',
                    megaContent: [
                        {
                            heading: 'Sabores Básicos',
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shopDefault'
                                    ),
                                    url: '/shop'
                                }
                            ]
                        },
                        {
                            heading: 'Sabores Premium',
                            megaItems: [
                                {
                                    text: this.$i18n.t('menu.mainMenu.default'),
                                    url: '/product/1'
                                }
                            ]
                        },
                        {
                            heading: 'Sabores de Gourmet',
                            megaItems: [
                                {
                                    text: this.$i18n.t('menu.mainMenu.simple'),
                                    url: '/product/1'
                                }
                            ]
                        },
                        {
                            heading: 'Sabores de Temporada',
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shoppingCart'
                                    ),
                                    url: '/account/shopping-cart'
                                }
                            ]
                        },
                        {
                            heading: 'Especiales',
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shoppingCart'
                                    ),
                                    url: '/account/shopping-cart'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
