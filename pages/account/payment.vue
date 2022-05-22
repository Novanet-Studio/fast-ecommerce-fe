<template lang="html">
    <section class="ps-page--my-account">
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
        <bread-crumb :breadcrumb="breadCrumb" />
        <payment />
        
    </section>
</template>

<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import EditAddress from '~/components/partials/account/EditAddress';
import Checkout from '~/components/partials/account/Checkout';
import Shipping from '~/components/partials/account/Shipping';
import Payment from '~/components/partials/account/Payment';
import HeaderMobile from '~/components/shared/mobile/HeaderMobile';
import Notify from '~/components/elements/commons/notify';

export default {
    transition: 'zoom',
    middleware: 'authentication',
    components: {
        HeaderMobile,
        Payment,
        Shipping,
        Checkout,
        EditAddress,
        BreadCrumb,
        Notify
    },

    data: () => {
        return {
            breadCrumb: [
                {
                    text: 'Home',
                    url: '/'
                },
                {
                    text: 'Shopping Cart',
                    url: '/account/shopping-cart'
                },
                {
                    text: 'Shipping'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
