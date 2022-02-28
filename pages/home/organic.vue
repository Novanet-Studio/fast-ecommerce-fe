<template lang="html">
    <v-app>
        <v-main>
            <header-organic />
            <header-mobile-organic />
            <main id="homepage-9">
                <organic-banner />
                <organic-site-features />
                <organic-top-categories />
                <organic-promotions />
                <organic-deal-hot
                    v-if="collections !== null"
                    collection-slug="organic-products"
                />
                <organic-new-arrivals
                    v-if="collections !== null"
                    collection-slug="organic-products"
                />
                <organic-client-say />
                <organic-blog />
                <newsletters />
                <footer-organic />
            </main>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import OrganicBanner from '~/components/partials/homepage/organic/OrganicBanner';
import OrganicSiteFeatures from '~/components/partials/homepage/organic/OrganicSiteFeatures';
import OrganicTopCategories from '~/components/partials/homepage/organic/OrganicTopCategories';
import OrganicClientSay from '~/components/partials/homepage/organic/OrganicClientSay';
import OrganicBlog from '~/components/partials/homepage/organic/OrganicBlog';
import FooterOrganic from '~/components/shared/footers/FooterOrganic';
import OrganicNewArrivals from '~/components/partials/homepage/organic/OrganicNewArrivals';
import HeaderOrganic from '~/components/shared/headers/HeaderOrganic';
import OrganicDealHot from '~/components/partials/homepage/organic/OrganicDealHot';
import OrganicPromotions from '~/components/partials/homepage/organic/OrganicPromotions';
import HeaderMobileOrganic from '~/components/shared/mobile/HeaderMobileOrganic';
import Newsletters from '~/components/partials/commons/Newsletters';

export default {
    transition: 'zoom',
    components: {
        Newsletters,
        HeaderMobileOrganic,
        OrganicPromotions,
        OrganicDealHot,
        HeaderOrganic,
        OrganicNewArrivals,
        FooterOrganic,
        OrganicBlog,
        OrganicClientSay,
        OrganicTopCategories,
        OrganicSiteFeatures,
        OrganicBanner,
        FooterDefault
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections
        })
    },
    async created() {
        const collectionsSlug = ['organic-products'];

        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsSlug
        );
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/organic.scss';
</style>
