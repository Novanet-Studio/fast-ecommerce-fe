<template lang="html">
    <div class="ps-product--detail ps-product--fullwidth">
        <div class="ps-product__header">
            <thumbnail-count-down :product="product" />
            <information-count-down :product="product" />
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
import ThumbnailCountDown from '~/components/elements/detail/thumbnail/ThumbnailCountDown';
import InformationCountDown from '~/components/elements/detail/information/InformationCountDown';
import { countdown } from '~/static/data/product';
export default {
    name: 'ProductDetailCountDown',
    components: {
        InformationCountDown,
        ThumbnailCountDown,
        InformationAffiliate,
        ThumbnailAffiliate,
        ThumbnailDefault,
        InformationDefault,
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
