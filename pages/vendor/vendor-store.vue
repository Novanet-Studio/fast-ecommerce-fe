<template lang="html">
    <div class="ps-page--single ps-page--vendor">
        <bread-crumb :breadcrumb="breadCrumb" />
        <vendor-store />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorStore from '~/components/partials/vendor/VendorStore';

export default {
    components: {
        BreadCrumb,
        VendorStore
    },

    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Vendor store'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
