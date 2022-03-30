<template lang="html">
    <div>
        <notifications />
    </div>
</template>

<script>
import Notifications from '~/components/partials/account/Notifications';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    layout: 'layout-account',
    components: {
        HeaderMobile,
        Notifications,
    },

};
</script>

<style lang="scss" scoped></style>
