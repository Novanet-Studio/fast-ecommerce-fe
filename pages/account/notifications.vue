<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <notifications />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Notifications from '~/components/partials/account/Notifications';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    components: {
        HeaderMobile,
        Notifications,
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
                    text: 'Invoices'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
