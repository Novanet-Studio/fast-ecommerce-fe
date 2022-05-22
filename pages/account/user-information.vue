<template lang="html">
    <div>
        <user-information />
        <notifications
            group="all"
            :duration="2000"
            :width="300"
            animation-name="fade-left"
            position="top right"
        >
            <template slot="body" slot-scope="props">
                <div class="ps-notify" :class="props.className">
                    <button class="ps-notify__close" @click="props.close">
                        <i class="icon icon-cross"></i>
                    </button>
                    <div class="ps-notify__header">
                        <span>{{ props.item.title }}</span>
                    </div>
                    <div class="ps-notify__content">
                        <p>{{ props.item.text }}</p>
                    </div>
                </div>
            </template>
        </notifications>
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
