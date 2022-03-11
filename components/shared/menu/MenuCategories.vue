<template lang="html">
    <ul class="menu--dropdown">
        <template v-for="item in categories">
            <li :key="item.id">
                <nuxt-link :to="`/shop/${item.id}`">
                    {{ item.name }}
                </nuxt-link>
            </li>
        </template>
        <!-- {{ categories }} -->
    </ul>
</template>

<script>
import  CollectionRepository from '~/repositories/CollectionRepository';
import  CategoryRepository from '~/repositories/CategoryRepository';
import MenuDefault from '~/components/shared/menu/MenuDefault';
import MenuDropdown from '~/components/shared/menu/MenuDropdown';
import MenuMega from '~/components/shared/menu/MenuMega';
export default {
    name: 'MenuCategories',
    components: { MenuMega, MenuDropdown, MenuDefault },
    data() {
        return {
            collections: '',
            categories: ''
            // menuCategories: [
            //     {
            //         icon: 'icon-star',
            //         text: 'Sabores Básicos',
            //         url: '/shop'
            //     },
            //     {
            //         icon: 'icon-laundry',
            //         text: 'Sabores premium',
            //         url: '/shop',
            //         extraClass: 'menu-item-has-children has-mega-menu',
            //         subClass: 'sub-menu',
            //         mega: true,
            //         megaContent: [
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.electronic'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.homeAudioAndTheathers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.tvAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cameraphotosAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cellphonesAndAccessories'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.headphone'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.videosgames'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.wirelessSpeakers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.officeElectronic'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             },
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.accessoriesAndParts'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.digitalCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.audioAndVideoCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.batteries'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         icon: 'icon-laundry',
            //         text: 'Sabores de Gourmet',
            //         url: '/shop',
            //         extraClass: 'menu-item-has-children has-mega-menu',
            //         subClass: 'sub-menu',
            //         mega: true,
            //         megaContent: [
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.electronic'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.homeAudioAndTheathers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.tvAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cameraphotosAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cellphonesAndAccessories'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.headphone'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.videosgames'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.wirelessSpeakers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.officeElectronic'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             },
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.accessoriesAndParts'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.digitalCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.audioAndVideoCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.batteries'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         icon: 'icon-laundry',
            //         text: 'Sabores de Temporada',
            //         url: '/shop',
            //         extraClass: 'menu-item-has-children has-mega-menu',
            //         subClass: 'sub-menu',
            //         mega: true,
            //         megaContent: [
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.electronic'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.homeAudioAndTheathers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.tvAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cameraphotosAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cellphonesAndAccessories'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.headphone'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.videosgames'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.wirelessSpeakers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.officeElectronic'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             },
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.accessoriesAndParts'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.digitalCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.audioAndVideoCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.batteries'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            //     {
            //         icon: 'icon-laundry',
            //         text: 'Especiales',
            //         url: '/shop',
            //         extraClass: 'menu-item-has-children has-mega-menu',
            //         subClass: 'sub-menu',
            //         mega: true,
            //         megaContent: [
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.electronic'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.homeAudioAndTheathers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.tvAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cameraphotosAndVideos'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.cellphonesAndAccessories'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.headphone'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.videosgames'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.wirelessSpeakers'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.officeElectronic'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             },
            //             {
            //                 heading: this.$i18n.t(
            //                     'menu.menuCategories.accessoriesAndParts'
            //                 ),
            //                 megaItems: [
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.digitalCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.audioAndVideoCables'
            //                         ),
            //                         url: '/shop'
            //                     },
            //                     {
            //                         text: this.$i18n.t(
            //                             'menu.menuCategories.batteries'
            //                         ),
            //                         url: '/shop'
            //                     }
            //                 ]
            //             }
            //         ]
            //     },
            // ],
        };

    },
    mounted() {
        this.asereje()
        this.categorias()
        

    },
    methods:{
        async asereje(){
            var colleciones = new CollectionRepository();
            // console.log(colleciones.getProductsBySlug('sleeve-linen-blend-caro-pane-shirt').then(val=>console.log(val)))
            // return colleciones.getProductsBySlug().then(val => {this.collections = val });
            return await colleciones.getProductsBySlug().then(val => {this.collections = val });
        },
        async categorias(){
            var categorias = new CategoryRepository();
            return await categorias.GetCategories().then(val=>{this.categories = val})
        }
    }

};
</script>

<style lang="scss" scoped></style>
