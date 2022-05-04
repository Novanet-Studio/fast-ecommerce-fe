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
                <v-list-group v-if="categoria.attributes.name != 'Inicio' " no-action>
                    <template v-slot:activator>
                        <v-list-item-content>
                            <nuxt-link
                                to="/"
                                @click="handleClosePanel"
                            >
                                {{ categoria.attributes.name }}
                            </nuxt-link>
                        </v-list-item-content>
                    </template>
                    <v-list>
                        <template v-for="producto in products">
                            <div v-if="categoria.id == producto.attributes.category.data.id">
                                <template>
                                    <v-list-item-content>
                                        <nuxt-link
                                            :to="`/product/${producto.id}`"
                                            @click="handleClosePanel"
                                            class="productoCat"
                                        >
                                            {{ producto.attributes.name }}
                                        </nuxt-link>
                                    </v-list-item-content>
                                </template>
                            </div>
                        </template>
                    </v-list>
                </v-list-group>
            </template>
        </v-list>
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
            return await categorias.GetCategories().then(val=>{ return this.categories = val.data})
        },
        async productos(){
            const productoPorId = new ProductoRepository();
            // return await productoPorId.GetProducts().then(val=>{return console.log(val)});
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
