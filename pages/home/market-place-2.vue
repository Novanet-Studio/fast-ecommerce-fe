<template lang="html">
    <main id="homepage-4">
        <market-place2-banner />
        <market-place-deal-of-day
            v-if="collections !== null"
            collection-slug="deal-of-the-day"
        />
        <market-place2-categories />
        <market-place2-promotions />
        <market2-consumer-electronics
            v-if="categories !== null"
            collection-slug="consumer-electrics"
        />
        <market2-clothing
            v-if="categories !== null"
            collection-slug="clothing-and-parel"
        />
        <market2-computer-and-technology
            v-if="categories !== null"
            collection-slug="computers-and-technologies"
        />
        <market2-garden-and-kitchen
            v-if="categories !== null"
            collection-slug="garden-and-kitchen"
        />
        <market2-healthy-and-beauty
            v-if="categories !== null"
            collection-slug="health-and-beauty"
        />
        <market-place2-download />
    </main>
</template>

<script>
import { mapState } from 'vuex';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import MarketPlace2Categories from '~/components/partials/homepage/marketplace-2/MarketPlace2Categories';
import MarketPlace2Promotions from '~/components/partials/homepage/marketplace-2/MarketPlace2Promotions';
import MarketPlace2Download from '~/components/partials/homepage/marketplace-2/MarketPlace2Download';
import Market2ConsumerElectronics from '~/components/partials/homepage/marketplace-2/Market2ConsumerElectronics';
import Market2Clothing from '~/components/partials/homepage/marketplace-2/Market2Clothing';
import Market2ComputerAndTechnology from '~/components/partials/homepage/marketplace-2/Market2ComputerAndTechnology';
import Market2GardenAndKitchen from '~/components/partials/homepage/marketplace-2/Market2GardenAndKitchen';
import Market2HealthyAndBeauty from '~/components/partials/homepage/marketplace-2/Market2HealthyAndBeauty';
import MarketPlace2Banner from '~/components/partials/homepage/marketplace-2/MarketPlace2Banner';
import HeaderMarketPlace2 from '~/components/shared/headers/HeaderMarketPlace2';
import MarketPlaceDealOfDay from '~/components/partials/homepage/marketplace/MarketPlaceDealOfDay';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    layout: 'layout-market-place-2',
    components: {
        HeaderMobile,
        MarketPlaceDealOfDay,
        HeaderMarketPlace2,
        MarketPlace2Banner,
        Market2HealthyAndBeauty,
        Market2GardenAndKitchen,
        Market2ComputerAndTechnology,
        Market2Clothing,
        Market2ConsumerElectronics,
        MarketPlace2Download,
        MarketPlace2Promotions,
        MarketPlace2Categories,
        FooterDefault
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            categories: state => state.collection.categories
        })
    },
    async created() {
        const collectionsSlug = ['deal-of-the-day'];
        const categoriesSlug = [
            'clothing-and-parel',
            'consumer-electrics',
            'computers-and-technologies',
            'garden-and-kitchen',
            'health-and-beauty'
        ];

        await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsSlug
        );
        await this.$store.dispatch(
            'collection/getCategoriesBySlugs',
            categoriesSlug
        );
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/market-place-2.scss';
</style>
