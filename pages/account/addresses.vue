<template lang="html">
    <div>
        <addresses />
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
