<template lang="html">
    <div>
        <invoice-detail />
    </div>
</template>

<script>
import InvoiceDetail from '~/components/partials/account/InvoiceDetail';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    layout: 'layout-account',
    components: {
        InvoiceDetail,
    },

};
</script>

<style lang="scss" scoped></style>
