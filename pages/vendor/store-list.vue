<template lang="html">
    <div class="ps-page--single ps-page--vendor">
        <bread-crumb :breadcrumb="breadCrumb" />
        <store-list />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import StoreList from '../../components/partials/vendor/StoreList';

export default {
    components: {
        StoreList,
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
                    text: 'Store List'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
