<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <recent-viewed-products />
    </section>
</template>
<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import RecentViewedProducts from '~/components/partials/account/RecentViewedProducts';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    components: {
        HeaderMobile,
        RecentViewedProducts,
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
                    text: 'Recent Viewed Products'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
