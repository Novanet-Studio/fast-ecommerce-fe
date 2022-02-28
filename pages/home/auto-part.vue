<template lang="html">
    <v-app>
        <v-main>
            <header-auto-part />
            <header-mobile-autopart />
            <main id="homepage-2">
                <autopart-banner />
                <autopart-categories />
                <autopart-promotions />
                <autopart-recommend-for-you
                    v-if="collections !== null"
                    collection-slug="autopart-recommend-products"
                />
                <autopart-deal-hot
                    v-if="collections !== null"
                    collection-slug="autopart-recommend-products"
                />
                <autopart-promotions2 />
                <autopart-best-sale-brand />
                <client-say />
                <site-features />
                <footer-autopart />
            </main>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import HeaderAutoPart from '~/components/shared/headers/HeaderAutoPart';
import FooterAutopart from '~/components/shared/footers/FooterAutopart';
import AutopartCategories from '~/components/partials/homepage/autopart/AutopartCategories';
import AutopartPromotions from '~/components/partials/homepage/autopart/AutopartPromotions';
import AutopartPromotions2 from '~/components/partials/homepage/autopart/AutopartPromotions2';
import AutopartBestSaleBrand from '~/components/partials/homepage/autopart/AutopartBestSaleBrand';
import SiteFeatures from '~/components/partials/commons/SiteFeatures';
import AutopartRecommendForYou from '~/components/partials/homepage/autopart/AutopartRecommendForYou';
import AutopartBanner from '~/components/partials/homepage/autopart/AutopartBanner';
import AutopartDealHot from '~/components/partials/homepage/autopart/AutopartDealHot';
import ClientSay from '~/components/partials/commons/ClientSay';
import HeaderMobileAutopart from '~/components/shared/mobile/HeaderMobileAutopart';
export default {
    transition: 'zoom',
    components: {
        HeaderMobileAutopart,
        AutopartDealHot,
        HeaderAutoPart,
        AutopartBanner,
        AutopartRecommendForYou,
        ClientSay,
        SiteFeatures,
        AutopartBestSaleBrand,
        AutopartPromotions2,
        AutopartPromotions,
        FooterAutopart,
        AutopartCategories
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections
        })
    },
    async created() {
        const queries = ['autopart-recommend-products'];
        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            queries
        );
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/autopart.scss';
</style>
