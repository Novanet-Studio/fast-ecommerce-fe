<template lang="html">
    <div>
        <invoices />
    </div>
</template>

<script>
import Invoices from '~/components/partials/account/Invoices';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    layout: 'layout-account',
    components: {
        HeaderMobile,
        Invoices,

    },
};
</script>

<style lang="scss" scoped></style>
