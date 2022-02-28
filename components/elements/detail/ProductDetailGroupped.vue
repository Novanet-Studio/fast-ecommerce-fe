<template lang="html">
    <div class="ps-product--detail ps-product--fullwidth">
        <div class="ps-product__header">
            <thumbnail-count-down :product="product" />
            <information-groupped :product="product" />
        </div>
        <default-description />
    </div>
</template>
<script>
import { countdown } from '~/static/data/product';
import DefaultDescription from '~/components/elements/detail/modules/DefaultDescription';
import ThumbnailCountDown from '~/components/elements/detail/thumbnail/ThumbnailCountDown';
import InformationGroupped from '~/components/elements/detail/information/InformationGroupped';
export default {
    name: 'ProductDetailGroupped',
    components: {
        InformationGroupped,
        ThumbnailCountDown,
        DefaultDescription
    },
    computed: {
        product() {
            return countdown;
        }
    }
};
</script>

<style lang="scss" scoped></style>
