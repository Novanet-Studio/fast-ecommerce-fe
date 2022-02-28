<template lang="html">
    <div class="ps-page--single">
        <img src="~/static/img/bg/about-us.jpg" alt="" />
        <bread-crumb :breadcrumb="breadCrumb" />
        <our-team />
        <about-awards />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import OurTeam from '~/components/partials/page/OurTeam';
import AboutAwards from '~/components/partials/page/AboutAwards';

export default {
    components: {
        AboutAwards,
        OurTeam,
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
                    text: 'About Us'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
