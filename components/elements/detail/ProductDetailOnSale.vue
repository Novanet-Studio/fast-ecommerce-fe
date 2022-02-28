<template lang="html">
    <div class="ps-product--detail ps-product--fullwidth">
        <div class="ps-product__header">
            <thumbnail-count-down :product="product" />
            <information-on-sale :product="product" />
        </div>
        <default-description />
    </div>
</template>

<script>
import DefaultDescription from '~/components/elements/detail/modules/DefaultDescription';
import InformationDefault from '~/components/elements/detail/information/InformationDefault';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import { countdown } from '~/static/data/product';
import ThumbnailCountDown from '~/components/elements/detail/thumbnail/ThumbnailCountDown';
import InformationGroupped from '~/components/elements/detail/information/InformationGroupped';
import InformationOnSale from '~/components/elements/detail/information/InformationOnSale';
export default {
    name: 'ProductDetailOnSale',
    components: {
        InformationOnSale,
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
