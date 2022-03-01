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
                    text: this.$i18n.t('menu.mainMenu.home'),
                    url: '/',
                    extraClass: 'menu-item-has-children',
                    subClass: 'sub-menu',
                    // subMenu: [
                    // ]
                },
                {
                    text: this.$i18n.t('menu.mainMenu.shop'),
                    url: '/shop',
                    extraClass: 'menu-item-has-children has-mega-menu',
                    subClass: 'sub-menu',
                    mega: 'true',
                    megaContent: [
                        {
                            heading: this.$i18n.t('menu.mainMenu.catalogPages'),
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shopDefault'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shopFullwidth'
                                    ),
                                    url: '/shop/shop-fullwidth'
                                },
                                /*{
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shopCategories'
                                    ),
                                    url: '/shop/shop-categories'
                                },*/
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shopSidebar'
                                    ),
                                    url: '/shop/shop-sidebar'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shopWithoutBanner'
                                    ),
                                    url: '/shop/shop-sidebar-without-banner'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shopCarousel'
                                    ),
                                    url: '/shop/shop-carousel'
                                }
                            ]
                        },
                        {
                            heading: this.$i18n.t(
                                'menu.mainMenu.productLayout'
                            ),
                            megaItems: [
                                {
                                    text: this.$i18n.t('menu.mainMenu.default'),
                                    url: '/product/1'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.extended'
                                    ),
                                    url: '/product/extended'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.fullContent'
                                    ),
                                    url: '/product/full-content'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.boxed'),
                                    url: '/product/boxed'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.sidebar'),
                                    url: '/product/sidebar'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.fullwidth'
                                    ),
                                    url: '/product/1'
                                }
                            ]
                        },
                        {
                            heading: this.$i18n.t('menu.mainMenu.productTypes'),
                            megaItems: [
                                {
                                    text: this.$i18n.t('menu.mainMenu.simple'),
                                    url: '/product/1'
                                },
                                /*{
                                    text: this.$i18n.t(
                                        'menu.mainMenu.imagesSwatches'
                                    ),
                                    url: '/product/image-swatches'
                                },*/
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.countdown'
                                    ),
                                    url: '/product/countdown'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.affiliate'
                                    ),
                                    url: '/product/affiliate'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.onSale'),
                                    url: '/product/on-sale'
                                },
                                /*{
                                    text: this.$i18n.t(
                                        'menu.mainMenu.videoFeatured'
                                    ),
                                    url: '/product/video-featured'
                                },*/
                                {
                                    text: this.$i18n.t('menu.mainMenu.grouped'),
                                    url: '/product/groupped'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.outOfStock'
                                    ),
                                    url: '/product/out-of-stock'
                                }
                            ]
                        },
                        {
                            heading: this.$i18n.t(
                                'menu.mainMenu.ecomercePages'
                            ),
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.shoppingCart'
                                    ),
                                    url: '/account/shopping-cart'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.checkout'
                                    ),
                                    url: '/account/checkout'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.whishlist'
                                    ),
                                    url: '/account/wishlist'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.compare'),
                                    url: '/account/compare'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.orderTracking'
                                    ),
                                    url: '/account/order-tracking'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.myAccount'
                                    ),
                                    url: '/account/login'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.loginOrregister'
                                    ),
                                    url: '/account/login'
                                }
                            ]
                        }
                    ]
                },
                {
                    text: this.$i18n.t('menu.mainMenu.pages'),
                    url: '/',
                    extraClass: 'menu-item-has-children has-mega-menu',
                    subClass: 'sub-menu',
                    mega: 'true',
                    megaContent: [
                        {
                            heading: this.$i18n.t('menu.mainMenu.basicPage'),
                            megaItems: [
                                {
                                    text: this.$i18n.t('menu.mainMenu.aboutUs'),
                                    url: '/page/about-us'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.contact'),
                                    url: '/page/contact-us'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.faqs'),
                                    url: '/page/faqs'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.404'),
                                    url: '/page/404-pape'
                                }
                            ]
                        },
                        {
                            heading: this.$i18n.t('menu.mainMenu.vendorPages'),
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.becomeAVendor'
                                    ),
                                    url: '/vendor/become-a-vendor'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.vendorStore'
                                    ),
                                    url: '/vendor/vendor-store'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.storeList'
                                    ),
                                    url: '/vendor/store-list'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.storeList2'
                                    ),
                                    url: '/vendor/store-list-2'
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
