<template lang="html">
    <div class="ps-product__desc">
        <p>
            Sold By:
            <nuxt-link to="/shop">
                <strong> {{ product.vendor }}</strong>
            </nuxt-link>
        </p>
        <ul class="ps-list--dot">
            <li>Unrestrained and portable active stereo speaker</li>
            <li>Free from the confines of wires and chords</li>
            <li>20 hours of portable capabilities</li>
            <li>
                Double-ended Coil Cord with 3.5mm Stereo Plugs Included
            </li>
            <li>3/4″ Dome Tweeters: 2X and 4″ Woofer: 1X</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ModuleProductDetailDesc',
    props: {
        product: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style lang="scss" scoped></style>
