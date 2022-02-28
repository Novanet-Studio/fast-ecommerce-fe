<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <shipping />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import EditAddress from '~/components/partials/account/EditAddress';
import Checkout from '~/components/partials/account/Checkout';
import Shipping from '~/components/partials/account/Shipping';

export default {
    middleware: 'authentication',
    components: {
        Shipping,
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
                    text: 'Shipping'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
