<template lang="html">
    <section class="ps-my-account ps-page--account">
        <div class="container">
            <div class="row">
                <div class="col-lg-4">
                    <div class="ps-section__left">
                        <aside class="ps-widget--account-dashboard">
                            <div class="ps-widget__header">
                                <img src="/img/users/3.jpg" />
                                <figure>
                                    <figcaption>Hello</figcaption>
                                    <p>username@gmail.com</p>
                                </figure>
                            </div>
                            <div class="ps-widget__content">
                                <AccountLinks :links="accountLinks" />
                            </div>
                        </aside>
                    </div>
                </div>
                <div class="col-lg-8">
                    <div class="ps-section--account-setting">
                        <div class="ps-section__content">
                            <div class="row">
                                <div class="col-md-6 col-12">
                                    <figure class="ps-block--address">
                                        <figcaption>
                                            Billing address
                                        </figcaption>
                                        <div class="ps-block__content">
                                            <p>
                                                You Have Not Set Up This Type Of
                                                Address Yet.
                                            </p>
                                            <nuxt-link
                                                to="/account/edit-address"
                                            >
                                                <a>Edit</a>
                                            </nuxt-link>
                                        </div>
                                    </figure>
                                </div>
                                <div class="col-md-6 col-12">
                                    <figure class="ps-block--address">
                                        <figcaption>
                                            Shipping address
                                        </figcaption>
                                        <div class="ps-block__content">
                                            <p>
                                                You Have Not Set Up This Type Of
                                                Address Yet.
                                            </p>
                                            <nuxt-link
                                                to="/account/edit-address"
                                            >
                                                <a>Edit</a>
                                            </nuxt-link>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import AccountLinks from './modules/AccountLinks';
export default {
    name: 'Addresses',
    components: { AccountLinks },
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
