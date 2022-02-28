<template lang="html">
    <div class="ps-page--single ps-page--vendor">
        <bread-crumb :breadcrumb="breadCrumb" />
        <store-list-2 />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import StoreList2 from '../../components/partials/vendor/StoreList2';

export default {
    components: {
        StoreList2,
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
