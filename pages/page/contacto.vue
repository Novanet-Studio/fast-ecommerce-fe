<template lang="html">
    <div class="ps-page--single">
        <bread-crumb :breadcrumb="breadCrumb" />
        <contact-map />
        <contact-info />
        <contact-form />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import ContactMap from '~/components/partials/page/ContactMap';
import ContactInfo from '~/components/partials/page/ContactInfo';
import ContactForm from '~/components/partials/page/ContactForm';

export default {
    components: {
        ContactForm,
        ContactInfo,
        ContactMap,
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
                    text: 'Contact Us'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
