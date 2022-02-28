<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
        <addresses />
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Addresses from '~/components/partials/account/Addresses';

export default {
    components: {
        Addresses,
        BreadCrumb
    },
    transition: 'zoom',
    middleware: 'authentication',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Addresses'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
