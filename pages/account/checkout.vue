<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <checkout />
    </section>
</template>
<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import EditAddress from '~/components/partials/account/EditAddress';
import Checkout from '~/components/partials/account/Checkout';

export default {
    middleware: 'authentication',
    components: {
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
                    text: 'Shopping Cart',
                    url: '/account/shopping-cart'
                },
                {
                    text: 'Checkout Information'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
