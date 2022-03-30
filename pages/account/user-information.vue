<template lang="html">
    <div>
        <user-information />
    </div>
</template>
<script>
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import UserInformation from '~/components/partials/account/UserInformation'
export default {
    middleware: 'authentication',
    transition: 'zoom',
    layout: 'layout-account',
    components: {
        HeaderMobile,
        UserInformation,
    },
};
</script>

<style lang="scss" scoped></style>
