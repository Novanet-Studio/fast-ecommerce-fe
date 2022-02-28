<template lang="html">
    <div class="ps-product--detail">
        <div class="ps-product__header ">
            <thumbnail-affiliate :product="product" />
            <information-affiliate :product="product" />
        </div>
        <default-description />
    </div>
</template>

<script>
import DefaultDescription from '~/components/elements/detail/modules/DefaultDescription';
import InformationDefault from '~/components/elements/detail/information/InformationDefault';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
import ThumbnailAffiliate from '~/components/elements/detail/thumbnail/ThumbnailAffiliate';
import InformationAffiliate from '~/components/elements/detail/information/InformationAffiliate';
import { sample } from '~/static/data/product';
export default {
    name: 'ProductDetailAffilate',
    components: {
        InformationAffiliate,
        ThumbnailAffiliate,
        ThumbnailDefault,
        InformationDefault,
        DefaultDescription
    },
    computed: {
        product() {
            return sample;
        }
    }
};
</script>

<style lang="scss" scoped></style>
