<template lang="html">
    <div class="ps-page--single">
        <bread-crumb :breadcrumb="breadCrumb" />
        <vendor-banner />
        <VendorAbout />
        <vendor-about />
        <vendor-mile-stone />
        <vendor-best-fees />
        <vendor-testimonials />
        <vendor-faqs />
        <vendor-banner2 />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import VendorBanner from '~/components/partials/vendor/VendorBanner';
import VendorAbout from '~/components/partials/vendor/VendorAbout';
import VendorMileStone from '~/components/partials/vendor/VendorMileStone';
import VendorBestFees from '~/components/partials/vendor/VendorBestFees';
import VendorFaqs from '~/components/partials/vendor/VendorFaqs';
import VendorBanner2 from '~/components/partials/vendor/VendorBanner2';
import VendorTestimonials from '~/components/partials/vendor/VendorTestimonials';

export default {
    components: {
        VendorTestimonials,
        VendorBanner2,
        VendorFaqs,
        VendorBestFees,
        VendorMileStone,
        VendorAbout,
        VendorBanner,
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
                    text: 'Become a vendor'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
