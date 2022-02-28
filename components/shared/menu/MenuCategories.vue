<template lang="html">
    <ul class="menu--dropdown">
        <template v-for="item in menuCategories">
            <menu-dropdown v-if="item.subMenu" :menu-data="item" />
            <menu-mega v-else-if="item.mega" :menu-data="item" />
            <li v-else :key="item.text">
                <nuxt-link :to="localePath(item.url)">
                    {{ item.text }}
                </nuxt-link>
            </li>
        </template>
    </ul>
</template>

<script>
import MenuDefault from '~/components/shared/menu/MenuDefault';
import MenuDropdown from '~/components/shared/menu/MenuDropdown';
import MenuMega from '~/components/shared/menu/MenuMega';
export default {
    name: 'MenuCategories',
    components: { MenuMega, MenuDropdown, MenuDefault },
    data() {
        return {
            menuCategories: [
                {
                    icon: 'icon-star',
                    text: this.$i18n.t('menu.menuCategories.hotPromotions'),
                    url: '/shop'
                },
                {
                    icon: 'icon-laundry',
                    text: this.$i18n.t(
                        'menu.menuCategories.consumerElectronic'
                    ),
                    url: '/shop',
                    extraClass: 'menu-item-has-children has-mega-menu',
                    subClass: 'sub-menu',
                    mega: true,
                    megaContent: [
                        {
                            heading: this.$i18n.t(
                                'menu.menuCategories.electronic'
                            ),
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.homeAudioAndTheathers'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.tvAndVideos'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.cameraphotosAndVideos'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.cellphonesAndAccessories'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.headphone'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.videosgames'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.wirelessSpeakers'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.officeElectronic'
                                    ),
                                    url: '/shop'
                                }
                            ]
                        },
                        {
                            heading: this.$i18n.t(
                                'menu.menuCategories.accessoriesAndParts'
                            ),
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.digitalCables'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.audioAndVideoCables'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.batteries'
                                    ),
                                    url: '/shop'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: 'icon-shirt',
                    text: this.$i18n.t(
                        'menu.menuCategories.clothingAndapparel'
                    ),
                    url: '/shop'
                },
                {
                    icon: 'icon-lampshade',
                    text: this.$i18n.t(
                        'menu.menuCategories.HomeGardenAndKitchen'
                    ),
                    url: '/shop'
                },
                {
                    icon: 'icon-heart-pulse',
                    text: this.$i18n.t('menu.menuCategories.healthAndBeauty'),
                    url: '/shop'
                },
                {
                    icon: 'icon-diamond2',
                    text: this.$i18n.t('menu.menuCategories.yewelryAndWatches'),
                    url: '/shop'
                },
                {
                    icon: 'icon-desktop',
                    text: this.$i18n.t(
                        'menu.menuCategories.computerAndTechnology'
                    ),
                    url: '/shop',
                    extraClass: 'menu-item-has-children has-mega-menu',
                    subClass: 'sub-menu',
                    megaContent: [
                        {
                            heading: this.$i18n.t(
                                'menu.menuCategories.computerAndTechnologies'
                            ),
                            megaItems: [
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.computerAndTablets'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.laptop'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.monitors'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.networking'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.driveAndStorages'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.computerComponents'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.securityAndProtection'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.gamingLaptop'
                                    ),
                                    url: '/shop'
                                },
                                {
                                    text: this.$i18n.t(
                                        'menu.menuCategories.accessories'
                                    ),
                                    url: '/shop'
                                }
                            ]
                        }
                    ]
                },
                {
                    icon: 'icon-baby-bottle',
                    text: this.$i18n.t('menu.menuCategories.babiesAndMoms'),
                    url: '/shop'
                },
                {
                    icon: 'icon-smartphone',
                    text: this.$i18n.t(
                        'menu.menuCategories.phonesAndAccessories'
                    ),
                    url: '/shop'
                },
                {
                    icon: 'icon-book2',
                    text: this.$i18n.t('menu.menuCategories.booksAndOffice'),
                    url: '/shop'
                },
                {
                    icon: 'icon-car-siren',
                    text: this.$i18n.t('menu.menuCategories.carsAndMotocycles'),
                    url: '/shop'
                },
                {
                    icon: 'icon-wrench',
                    text: this.$i18n.t('menu.menuCategories.homeImproments'),
                    url: '/shop'
                },
                {
                    icon: 'icon-tag',
                    text: this.$i18n.t(
                        'menu.menuCategories.vouchersAndServices'
                    ),
                    url: '/shop'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
