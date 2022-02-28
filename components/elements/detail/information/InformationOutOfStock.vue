<template lang="html">
    <div class="ps-product__info">
        <module-product-info :product="product" />
        <div class="ps-product__desc">
            <p>
                Sold By:
                <nuxt-link to="/shop">
                    <strong> {{ product.vendor }}</strong>
                </nuxt-link>
                Status:
                <a href="#">
                    <strong class="ps-tag--out-stock"> Out of stock</strong>
                </a>
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

        <module-product-detail-specification />

        <module-product-detail-sharing />
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ModuleProductDetailSharing from '~/components/elements/detail/information/modules/ModuleProductDetailSharing';
import ModuleProductDetailSpecification from '~/components/elements/detail/information/modules/ModuleProductDetailSpecification';
import ModuleProductDetailDesc from '~/components/elements/detail/information/modules/ModuleProductDetailDesc';
import Rating from '~/components/elements/Rating';
import ModuleProductGroupped from '~/components/elements/detail/information/modules/ModuleProductGroupped';
import ModuleProductShopping from '~/components/elements/detail/information/modules/ModuleProductShopping';
import ModuleProductInfo from '~/components/elements/detail/information/modules/ModuleProductInfo';

export default {
    name: 'InformationOutOfStock',
    components: {
        ModuleProductInfo,
        ModuleProductShopping,
        ModuleProductGroupped,
        ModuleProductDetailDesc,
        ModuleProductDetailSpecification,
        ModuleProductDetailSharing
    },
    props: {
        product: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style lang="scss" scoped></style>
