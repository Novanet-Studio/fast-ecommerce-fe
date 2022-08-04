<template lang="html">
    <div class="ps-page--single">
        <div class="container">
            <faqs />
        </div>
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import Faqs from '~/components/partials/page/Faqs';

export default {
    layout: "layout-default",

    components: {
        Faqs,
        BreadCrumb
    },
    transition: 'zoom',
    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Frequently Asked Questions'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
