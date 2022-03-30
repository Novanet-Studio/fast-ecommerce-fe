<template lang="html">
    <section class="ps-my-account ps-page--account">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="ps-section__left">
                        <aside-account/>
                    </div>
                </div>
                <div class="col-lg-8">
                    <FormEditAddress />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AsideAccount from './modules/AsideAccount';
import FormEditAddress from '~/components/partials/account/modules/FormEditAddress';

export default {
    name: 'EditAddress',
    components: { AsideAccount, FormEditAddress },
    data() {
        return {
            accountLinks: [
                {
                    text: 'Account Information',
                    url: '/account/user-information',
                    icon: 'icon-user'
                },
                {
                    text: 'Notifications',
                    url: '/account/notifications',
                    icon: 'icon-alarm-ringing'
                },
                {
                    text: 'Invoices',
                    url: '/account/invoices',
                    icon: 'icon-papers'
                },
                {
                    text: 'Address',
                    url: '/account/addresses',
                    icon: 'icon-map-marker',
                    active: true
                },
                {
                    text: 'Recent Viewed Product',
                    url: '/account/recent-viewed-product',
                    icon: 'icon-store'
                },
                {
                    text: 'Wishlist',
                    url: '/account/wishlist',
                    icon: 'icon-heart'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
