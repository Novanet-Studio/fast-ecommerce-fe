<template lang="html">
    <main id="homepage-1">
        <home-banner/>
        <template v-if="categories !== null">
            <div v-for="category in categories" :key="category.id">
                <productos-landing :category="category"/>
            </div>
        </template> 
    </main>
</template>
<script>
//farine
import ProductosLanding from '~/components/partials/homepage/farine/ProductosLanding';
import CategoryRepository from '~/repositories/CategoryRepository';

import { mapState } from 'vuex';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import HomeBanner from '~/components/partials/homepage/default/HomeBanner';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import NavigationList from '~/components/shared/mobile/NavigationList';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import MobileDrawer from '~/components/shared/mobile/MobileDrawer';
import HomeDefaultDealOfDay from '~/components/partials/homepage/default/HomeDefaultDealOfDay';
import DemoPanel from '~/components/shared/DemoPanel';

export default {
    transition: 'zoom',
    layout: 'layout-default',
    components: {
        ProductosLanding,
        MobileDrawer,
        HeaderMobile,
        NavigationList,
        HeaderDefault,
        HomeBanner,
        FooterFullwidth,
    },
    data(){
        return {
            categories: []
        }
    },
    mounted(){
        this.categorias()
    },
    methods: {
        async categorias(){
            const categorias = new CategoryRepository();
            return await categorias.GetCategories().then(val => {return this.categories = val})
        }
    }


};
</script>
