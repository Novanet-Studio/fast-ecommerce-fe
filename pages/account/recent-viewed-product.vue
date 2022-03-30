<template lang="html">
    <div>
        <recent-viewed-products />
    </div>
</template>
<script>
import RecentViewedProducts from '~/components/partials/account/RecentViewedProducts';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    layout: 'layout-account',
    components: {
        HeaderMobile,
        RecentViewedProducts,
    },
};
</script>

<style lang="scss" scoped></style>
