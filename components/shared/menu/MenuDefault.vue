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
                    subMenu: [
                        {
                            text: this.$i18n.t(
                                'menu.mainMenu.marketplaceFullWidth'
                            ),
                            url: '/'
                        },
                        /*{
                            text: this.$i18n.t('menu.mainMenu.homeAutoParts'),
                            url: '/home/auto-part'
                        },*/
                        /*{
                            text: this.$i18n.t('menu.mainMenu.homeTechnology'),
                            url: '/home/technology'
                        },*/
                        /*{
                            text: this.$i18n.t('menu.mainMenu.homeOrganic'),
                            url: '/home/organic'
                        },*/
                        {
                            text: this.$i18n.t(
                                'menu.mainMenu.homeMarketplaceV1'
                            ),
                            url: '/home/market-place'
                        },
                        {
                            text: this.$i18n.t(
                                'menu.mainMenu.homeMarketplaceV2'
                            ),
                            url: '/home/market-place-2'
                        },
                        {
                            text: this.$i18n.t(
                                'menu.mainMenu.homeMarketplaceV3'
                            ),
                            url: '/home/market-place-3'
                        },
                        {
                            text: this.$i18n.t(
                                'menu.mainMenu.homeMarketplaceV4'
                            ),
                            url: '/home/market-place-4'
                        }
                        /*{
                            text: this.$i18n.t('menu.mainMenu.homeElectronic'),
                            url: '/home/electronic'
                        },*/
                        /*{
                            text: this.$i18n.t('menu.mainMenu.homeFurniture'),
                            url: '/home/furniture'
                        }*/
                    ]
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
                },
                {
                    text: this.$i18n.t('menu.mainMenu.blogs'),
                    url: '/blog',
                    current: 'shop',
                    extraClass: 'menu-item-has-children has-mega-menu',
                    subClass: 'sub-menu',
                    mega: 'true',
                    megaContent: [
                        {
                            heading: this.$i18n.t('menu.mainMenu.blogLayout'),
                            megaItems: [
                                {
                                    text: this.$i18n.t('menu.mainMenu.grid'),
                                    url: '/blog'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.list'),
                                    url: '/blog/blog-list'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.smallThumb'
                                    ),
                                    url: '/blog/blog-small-thumbnail'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.leftSidebar'
                                    ),
                                    url: '/blog/blog-left-sidebar'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.mainMenu.rightSidebar'
                                    ),
                                    url: '/blog/blog-right-sidebar'
                                }
                            ]
                        },
                        {
                            heading: this.$i18n.t('menu.mainMenu.singleBlog'),
                            megaItems: [
                                {
                                    text: this.$i18n.t('menu.mainMenu.single1'),
                                    url: '/post/detail-2'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.single2'),
                                    url: '/post/detail-2'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.single3'),
                                    url: '/post/detail-3'
                                },
                                {
                                    text: this.$i18n.t('menu.mainMenu.single4'),
                                    url: '/post/1'
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
