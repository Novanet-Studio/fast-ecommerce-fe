<template lang="html">
    <v-app>
        <v-main>
            <header-electronic />
            <header-mobile-electronic />
            <main id="homepage-7">
                <electronic-banner />
                <electronic-top-categories />
                <electronic-best-seller
                    v-if="collections !== null"
                    collection-slug="electronics-best-sellers"
                />
                <electronic-promotions />
                <electronic-computer-and-technology
                    v-if="collections !== null"
                    collection-slug="electronic_computer_technolog"
                />
                <electronic-home-electronics
                    v-if="collections !== null"
                    collection-slug="electronic_computer_technolog"
                />
                <electronic-camera
                    v-if="collections !== null"
                    collection-slug="electronic_computer_technolog"
                />
                <footer-default />
            </main>
        </v-main>
    </v-app>
</template>

<script>
import { mapState } from 'vuex';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import ElectronicTopCategories from '~/components/partials/homepage/electronic/ElectronicTopCategories';
import ElectronicComputerAndTechnology from '~/components/partials/homepage/electronic/ElectronicComputerAndTechnology';
import ElectronicBestSeller from '~/components/partials/homepage/electronic/ElectronicBestSeller';
import ElectronicHomeElectronics from '~/components/partials/homepage/electronic/ElectronicHomeElectronics';
import ElectronicCamera from '~/components/partials/homepage/electronic/ElectronicCamera';
import ElectronicPromotions from '~/components/partials/homepage/electronic/ElectronicPromotions';
import HeaderElectronic from '~/components/shared/headers/HeaderElectronic';
import ElectronicBanner from '~/components/partials/homepage/electronic/ElectronicBanner';
import HeaderMobileElectronic from '~/components/shared/mobile/HeaderMobileElectronic';
export default {
    transition: 'zoom',
    components: {
        HeaderMobileElectronic,
        ElectronicBanner,
        HeaderElectronic,
        ElectronicPromotions,
        ElectronicCamera,
        ElectronicHomeElectronics,
        ElectronicBestSeller,
        ElectronicComputerAndTechnology,
        ElectronicTopCategories,
        FooterDefault
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections
        })
    },
    async created() {
        const collectionsParams = [
            'electronics-best-sellers',
            'electronic_computer_technolog',
            'electronics-cameras-and-videos'
        ];
        const categorySlugs = [
            'computers-and-technologies',
            'consumer-electrics'
        ];
        const collections = await this.$store.dispatch(
            'collection/getCollectionsBySlugs',
            collectionsParams
        );

        const categories = await this.$store.dispatch(
            'product/getProductCategories',
            categorySlugs
        );
    }
};
</script>

<style lang="scss">
@import '~/assets/scss/electronic.scss';
</style>
