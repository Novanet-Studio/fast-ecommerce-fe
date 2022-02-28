<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <invoice-detail />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Newsletters from '~/components/partials/commons/Newsletters';
import InvoiceDetail from '~/components/partials/account/InvoiceDetail';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    components: {
        InvoiceDetail,
        Newsletters,
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
                    text: 'Invoice Detail'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
