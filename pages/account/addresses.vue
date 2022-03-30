<template lang="html">
    <div>
        <addresses />
    </div>
</template>

<script>
import Addresses from '~/components/partials/account/Addresses';

export default {
    components: {
        Addresses,
    },
    layout: 'layout-account',
    transition: 'zoom',
    middleware: 'authentication',
};
</script>

<style lang="scss" scoped></style>
