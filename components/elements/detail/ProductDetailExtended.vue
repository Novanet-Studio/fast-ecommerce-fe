<template lang="html">
    <div class="ps-product--detail ps-product--fullwidth">
        <div class="ps-product__header">
            <thumbnail-count-down :product="product" />
            <information-extended :product="product" />
        </div>
        <default-description />
    </div>
</template>

<script>
import DefaultDescription from '~/components/elements/detail/modules/DefaultDescription';
import { extended } from '~/static/data/product';
import ThumbnailCountDown from '~/components/elements/detail/thumbnail/ThumbnailCountDown';
import InformationExtended from '~/components/elements/detail/information/InformationExtended';
export default {
    name: 'ProductDetailExtended',
    components: {
        InformationExtended,
        ThumbnailCountDown,
        DefaultDescription
    },
    computed: {
        product() {
            return extended;
        }
    }
};
</script>

<style lang="scss" scoped></style>
