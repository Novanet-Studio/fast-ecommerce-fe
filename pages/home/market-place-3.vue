<template lang="html">
    <main id="homepage-5">
        <martket-place3-banner />
        <market3-categories-tabs />
        <market3-deal-of-day
            v-if="collections !== null"
            collection-slug="deal-of-the-day"
        />
        <div class="ps-product-box">
            <div class="container">
                <market-place3-promotions />
                <market3-consumer-electronics
                    v-if="categories !== null"
                    collection-slug="consumer-electrics"
                />
                <market3-clothing
                    v-if="categories !== null"
                    collection-slug="clothing-and-parel"
                />
                <market3-garden-and-kitchen
                    v-if="categories !== null"
                    collection-slug="garden-and-kitchen"
                />
            </div>
        </div>
    </main>
</template>
<script>
import { mapState } from 'vuex';
import MartketPlace3Banner from '~/components/partials/homepage/marketplace-3/MartketPlace3Banner';
import MarketPlace3Promotions from '~/components/partials/homepage/marketplace-3/MarketPlace3Promotions';
import HeaderMarketPlace3 from '~/components/shared/headers/HeaderMarketPlace3';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import Market3ConsumerElectronics from '~/components/partials/homepage/marketplace-3/Market3ConsumerElectronics';
import Market3Clothing from '~/components/partials/homepage/marketplace-3/Market3Clothing';
import Market3GardenAndKitchen from '~/components/partials/homepage/marketplace-3/Market3GardenAndKitchen';
import Market3DealOfDay from '~/components/partials/homepage/marketplace-3/Market3DealOfDay';
import Market3CategoriesTabs from '~/components/partials/homepage/marketplace-3/Market3CategoriesTabs';
import SiteFeatures from '~/components/partials/commons/SiteFeatures';

export default {
    transition: 'zoom',
    layout: 'layout-market-place-3',
    components: {
        SiteFeatures,
        Market3CategoriesTabs,
        Market3DealOfDay,
        Market3GardenAndKitchen,
        Market3Clothing,
        Market3ConsumerElectronics,
        HeaderMobile,
        HeaderMarketPlace3,
        MarketPlace3Promotions,
        MartketPlace3Banner
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

        const categories = await this.$store.dispatch(
            'collection/getCategoriesBySlugs',
            categoriesSlug
        );
        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsSlug
        );
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/market-place-3.scss';
</style>
