<template lang="html">
    <div class="_content">
        <header-technology />
        <main id="homepage-10">
            <technology-banner />
            <technology-deal-of-day
                v-if="categories !== null"
                collection-slug="computers-and-technologies"
            />
            <technology-promotions />
            <technology-top-categories />
            <technology-smart-phone
                v-if="categories !== null"
                collection-slug="phones-and-accessories"
            />
            <technology-laptop-and-sound
                v-if="categories !== null"
                collection-slug="phones-and-accessories"
            />
            <technology-toys
                v-if="collections !== null"
                collection-slug="technology-toys"
            />
            <technology-good-price
                v-if="collections !== null"
                collection-slug="technology-good-price"
            />
            <footer-default />
        </main>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import TechnologySiteFeatures from '~/components/partials/homepage/technology/TechnologySiteFeatures';
import TechnologyPromotions from '~/components/partials/homepage/technology/TechnologyPromotions';
import TechnologyTopCategories from '~/components/partials/homepage/technology/TechnologyTopCategories';
import TechnologySmartPhone from '~/components/partials/homepage/technology/TechnologySmartPhone';
import TechnologyLaptopAndSound from '~/components/partials/homepage/technology/TechnologyLaptopAndSound';
import TechnologyToys from '~/components/partials/homepage/technology/TechnologyToys';
import TechnologyGoodPrice from '~/components/partials/homepage/technology/TechnologyGoodPrice';
import TechnologyDealOfDay from '~/components/partials/homepage/technology/TechnologyDealOfDay';
import HeaderTechnology from '~/components/shared/headers/HeaderTechnology';
import TechnologyBanner from '~/components/partials/homepage/technology/TechnologyBanner';

export default {
    transition: 'zoom',
    components: {
        TechnologyBanner,
        HeaderTechnology,
        TechnologyDealOfDay,
        TechnologyGoodPrice,
        TechnologyToys,
        TechnologyLaptopAndSound,
        TechnologySmartPhone,
        TechnologyTopCategories,
        TechnologyPromotions,
        TechnologySiteFeatures,
        FooterDefault
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections,
            categories: state => state.collection.categories
        })
    },
    async created() {
        const collectionsSlug = ['technology-toys', 'technology-good-price'];
        const categorySlugs = [
            'computers-and-technologies',
            'phones-and-accessories'
        ];

        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsSlug
        );

        const categories = await this.$store.dispatch(
            'collection/getCategoriesBySlugs',
            categorySlugs
        );
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/technology.scss';
</style>
