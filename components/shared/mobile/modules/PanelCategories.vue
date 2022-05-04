<template lang="html">
    <div class="ps-panel--sidebar">
        <div class="ps-panel__header">
            <h3>Categorias</h3>
            <a
                href="#"
                class="ps-panel__close"
                @click.prevent="handleClosePanel"
            >
                <i class="icon icon-cross"></i>
            </a>
        </div>
        <div class="navigation__content">
            <ul class="menu--mobile">
                <li v-for="category in categories">
                    <!-- <nuxt-link to="/shop">{{ category.attributes.name }}</nuxt-link> -->
                    <p>{{ category.attributes.name }}</p>
                
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import  CategoryRepository from '~/repositories/CategoryRepository';

export default {
    name: 'PanelCategories',
    data() {
        return {
            categories: '',
        }
    },
    mounted(){
        this.categorias()
    },
    methods: {
        handleClosePanel() {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        },
        async categorias(){
            var categorias = new CategoryRepository();
            // return await categorias.GetCategories().then(val=>{return console.log(val)})
            return await categorias.GetCategories().then(val=>{this.categories = val.data})
        },

    }
};
</script>

<style lang="scss" scoped>
.menu--mobile{
    li{
        p{
            padding: 10px 10px;
            margin-bottom: 0px;
            font-size: 17px;
        }
    }
}
</style>
