<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <wishlist />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import { getListOfProductId } from '~/utilities/product-helper';
import Wishlist from '~/components/partials/account/Wishlist';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    components: {
        HeaderMobile,
        Wishlist,
        BreadCrumb
    },

    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Wishlist'
                }
            ]
        };
    },
    async created() {
        const wishlistItemsOnCookie = this.$cookies.get('wishlist', {
            parseJSON: true
        });
        if (wishlistItemsOnCookie) {
            const queries = getListOfProductId(wishlistItemsOnCookie.items);
            if (queries.length > 0) {
                const response = await this.$store.dispatch(
                    'product/getWishlishtProducts',
                    queries
                );
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
