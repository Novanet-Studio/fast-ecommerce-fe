<template lang="html">
    <div>
        <bread-crumb :breadcrumb="breadCrumb" />
        <user-information />
    </div>
</template>
<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import UserInformation from '~/components/partials/account/UserInformation';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    middleware: 'authentication',
    transition: 'zoom',
    layout: 'layout-account',
    components: {
        HeaderMobile,
        UserInformation,
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
                    text: 'User Information'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
