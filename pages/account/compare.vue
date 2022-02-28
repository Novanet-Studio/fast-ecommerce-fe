<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <compare />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import EditAddress from '~/components/partials/account/EditAddress';
import Checkout from '~/components/partials/account/Checkout';
import Compare from '~/components/partials/account/Compare';
import { getListOfProductId } from '~/utilities/product-helper';

export default {
    components: {
        Compare,
        Checkout,
        EditAddress,
        BreadCrumb
    },
    transition: 'zoom',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },

                {
                    text: 'Compare'
                }
            ]
        };
    },
    async created() {
        const compareItems = this.$cookies.get('compare', {
            parseJSON: true
        });

        if (compareItems) {
            const queries = getListOfProductId(compareItems.items);
            if (queries.length >= 0) {
                const products = await this.$store.dispatch(
                    'product/getCompareProducts',
                    queries
                );
                console.log(products);
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
