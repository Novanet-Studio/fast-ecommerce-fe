<template lang="html">
    <div class="ps-panel--sidebar">
        <div class="ps-panel__header">
            <h3>Menu</h3>
            <a
                href="#"
                class="ps-panel__close"
                @click.prevent="handleClosePanel"
            >
                <i class="icon icon-cross"></i>
            </a>
        </div>
        <br>
        <!-- <div class="ps-panel__content">
            <div class="ps-site-actions">
                <div class="row">
                    <div class="col-6">
                        <mobile-currency-switcher />
                    </div>
                    <div class="col-6">
                        <mobile-languge-switcher />
                    </div>
                </div>
            </div> -->
            <v-list class="menu--mobile">
                <v-list-item>
                    <v-list-item-content>
                        <nuxt-link
                            to="/"
                            @click="handleClosePanel"
                        >
                            Inicio
                        </nuxt-link>
                    </v-list-item-content>
                </v-list-item>
                <template v-for="categoria in categories">
                    <v-list-group v-if="categoria.name != 'Inicio' " no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link
                                    to="/"
                                    @click="handleClosePanel"
                                >
                                    {{ categoria.name }}
                                </nuxt-link>
                            </v-list-item-content>
                        </template>
                        <v-list>
                            <template v-for="producto in products">
                                <div v-if="categoria.id == producto.category.id">
                                    <template>
                                        <v-list-item-content>
                                            <nuxt-link
                                                :to="`/product/${producto.id}`"
                                                @click="handleClosePanel"
                                                class="productoCat"
                                            >
                                                {{ producto.name }}
                                            </nuxt-link>
                                        </v-list-item-content>
                                    </template>
                                </div>
                            </template>
                        </v-list>
                    </v-list-group>
                </template>
                <!-- <template v-for="menuItem in menu">
                    <v-list-group v-if="menuItem.subMenu" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link
                                    :to="menuItem.url"
                                    @click="handleClosePanel"
                                >
                                    {{ menuItem.text }}
                                </nuxt-link>
                            </v-list-item-content>
                        </template>
                        <mobile-submenu :menu="menuItem.subMenu" />
                    </v-list-group>
                    <v-list-group v-else-if="menuItem.mega" no-action>
                        <template v-slot:activator>
                            <v-list-item-content>
                                <nuxt-link
                                    :to="menuItem.url"
                                    @click="handleClosePanel"
                                >
                                    {{ menuItem.text }} hola
                                </nuxt-link>
                            </v-list-item-content>
                        </template>
                        <v-list>
                            <template v-for="megaItem in menuItem.megaContent">
                                <v-list-group no-action>
                                    <template v-slot:activator>
                                        <v-list-item-content>
                                            <nuxt-link
                                                :to="menuItem.url"
                                                @click="handleClosePanel"
                                            >
                                                {{ megaItem.heading }} hola2
                                            </nuxt-link>
                                        </v-list-item-content>
                                    </template>
                                    <mobile-submenu
                                        :menu="megaItem.megaItems"
                                    />
                                </v-list-group>
                            </template>
                        </v-list>
                    </v-list-group>
                    <v-list-item v-else>
                        <v-list-item-content>
                            <nuxt-link
                                :to="menuItem.url"
                                @click="handleClosePanel"
                            >
                                {{ menuItem.text }} holaaa
                            </nuxt-link>
                        </v-list-item-content>
                    </v-list-item>
                </template> -->
            </v-list>
        </div>
    </div>
</template>

<script>
import  CategoryRepository from '~/repositories/CategoryRepository';
import  ProductoRepository from '~/repositories/ProductoRepository';

// import { mainMenu } from '~/static/data/menu.json';
import MobileSubmenu from '~/components/shared/mobile/modules/MobileSubmenu';
import MobileCurrencySwitcher from '~/components/shared/mobile/modules/MobileCurrencySwitcher';
import MobileLangugeSwitcher from '~/components/shared/mobile/modules/MobileLangugeSwitcher';
export default {
    name: 'PanelMenu',
    components: {
        MobileLangugeSwitcher,
        MobileCurrencySwitcher,
        MobileSubmenu
    },
    data() {
        return {
            categories: '',
            products: ''
        }
    },
    mounted(){
        this.categorias()
        this.productos()
    },

    // computed: {
    //     menu() {
    //         return mainMenu;
    //     }
    // },
    methods: {
        handleClosePanel() {
            console.log('test');
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        }, 
        async categorias(){
            var categorias = new CategoryRepository();
            return await categorias.GetCategories().then(val=>{this.categories = val})
        },
        async productos(){
            const productoPorId = new ProductoRepository();
            // return console.log(await productoPorId.GetProductById(this.productId).then(val=>{return this.product = val}));
            return await productoPorId.GetProducts().then(val=>{return this.products = val});
        }

    }
};
</script>

<style lang="scss" scoped>
.productoCat{
    margin-left: 35px!important;
}
</style>
