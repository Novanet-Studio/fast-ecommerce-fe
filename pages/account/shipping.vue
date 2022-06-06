<template lang="html">
<div>
    <header-default />

    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <shipping />
    </section>
        <footer-fullwidth />

</div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import EditAddress from '~/components/partials/account/EditAddress';
import Checkout from '~/components/partials/account/Checkout';
import HeaderDefault from '~/components/shared/headers/HeaderDefault';
import FooterFullwidth from '~/components/shared/footers/FooterFullwidth';

import Shipping from '~/components/partials/account/Shipping';

export default {
    middleware: 'authentication',
    components: {
        Shipping,
        Checkout,
        EditAddress,
        BreadCrumb,
        HeaderDefault,
        FooterFullwidth
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
