<template lang="html">
    <div class="ps-vendor-banner bg--cover">
        <div class="container">
            <h2>
                Millions Of Shoppers Can’t Wait To See What You Have In Store
            </h2>
            <nuxt-link to="/vendor/store-list" class="ps-btn ps-btn--lg">
                Start Selling
            </nuxt-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VendorBanner'
};
</script>

<style lang="scss" scoped>
.ps-vendor-banner {
    background: url('/img/bg/vendor.jpg');
}
</style>
