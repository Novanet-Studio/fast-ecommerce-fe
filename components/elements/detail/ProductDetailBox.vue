<template lang="html">
    <div class="ps-product--detail ps-product--box">
        <div class="ps-product__header ps-product__box">
            <thumbnail-box :product="product" />
            <information-boxed :product="product" />
        </div>
        <div class="ps-product__content">
            <default-description/>
        </div>
    </div>
</template>

<script>
import { sample } from '~/static/data/product';
import ThumbnailBox from '~/components/elements/detail/thumbnail/ThumbnailBox';
import InformationBoxed from '~/components/elements/detail/information/InformationBoxed';
import DefaultDescription from '~/components/elements/detail/modules/DefaultDescription';
export default {
    name: 'ProductDetailBox',
    components: { DefaultDescription, InformationBoxed, ThumbnailBox },
    computed: {
        product() {
            return sample;
        }
    }
};
</script>

<style lang="scss" scoped></style>
