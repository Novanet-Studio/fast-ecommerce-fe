<template lang="html">
    <main id="homepage-1">
        <home-banner/>
        <!-- <site-feautures-fullwidth/> -->
        <!-- <home-default-deal-of-day
            v-if="collections !== null"
            collection-slug="deal-of-the-day"
        /> -->
        <!-- <home-ads-columns/> -->
        <!-- <home-default-top-categories/> -->
        <template v-if="collections !== null">
            <conumer-electronics collection-slug="consumer-electronics"/>
            <clothings collection-slug="clothings"/>
            <garden-and-kitchen collection-slug="garden-and-kitchen"/>
        </template>
        <!-- <home-ads/>
        <download-app/> -->
        <!-- <new-arrivals
            collection-slug="new-arrivals-products"
        /> -->
        <!-- <newsletters layout="fullwidth"/> -->
    </main>
</template>
<script>
import { mapState } from 'vuex';
import DownloadApp from '~/components/partials/commons/DownloadApp';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';
import Newsletters from '~/components/partials/commons/Newsletters';
import SiteFeauturesFullwidth from '~/components/partials/commons/SiteFeauturesFullwidth';
import HomeAdsColumns from '~/components/partials/homepage/default/HomeAdsColumns';
import HomeAds from '~/components/partials/homepage/default/HomeAds';
import NewArrivals from '~/components/partials/homepage/default/NewArrivals';
import HomeDefaultTopCategories from '~/components/partials/homepage/default/HomeDefaultTopCategories';
import GardenAndKitchen from '~/components/partials/homepage/default/GardenAndKitchen';
import Clothings from '~/components/partials/homepage/default/Clothings';
import ConumerElectronics from '~/components/partials/homepage/default/ConumerElectronics';
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
        DemoPanel,
        HomeDefaultDealOfDay,
        MobileDrawer,
        HeaderMobile,
        NavigationList,
        HeaderDefault,
        HomeBanner,
        GardenAndKitchen,
        HomeAdsColumns,
        SiteFeauturesFullwidth,
        HomeAds,
        FooterFullwidth,
        DownloadApp,
        Newsletters,
        NewArrivals,
        HomeDefaultTopCategories,
        Clothings,
        ConumerElectronics
    },

    computed: {
        ...mapState({
            collections: state => state.collection.collections
        })
    },

    async created() {
        const queries = [
            'deal-of-the-day',
            'consumer-electronics',
            'clothings',
            'garden-and-kitchen',
            'new-arrivals-products'
        ];
        await this.$store.dispatch('collection/getCollectionsBySlugs', queries);
    }
};
</script>
