<template lang="html">
    <section class="ps-page--my-account">
        <bread-crumb :breadcrumb="breadCrumb" />
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
        <checkout />
    </section>
</template>
<script>
import BreadCrumb from '~/components/elements/BreadCrumb';
import EditAddress from '~/components/partials/account/EditAddress';
import Checkout from '~/components/partials/account/Checkout';

export default {
    middleware: 'authentication',
    components: {
        Checkout,
        EditAddress,
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
                    text: 'Carrito de compra',
                    url: '/account/shopping-cart'
                },
                {
                    text: 'Información de compra'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
