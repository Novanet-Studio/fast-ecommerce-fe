<template lang="html">
    <div class="ps-page--single">
        <img src="~/static/img/bg/about-us.jpg" alt="" />
        <about-awards />
    </div>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import OurTeam from '~/components/partials/page/OurTeam';
import AboutAwards from '~/components/partials/page/AboutAwards';

export default {
    layout: "layout-default",
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
                    text: 'Inicio',
                    url: '/'
                },
                {
                    text: 'Nosotros'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
