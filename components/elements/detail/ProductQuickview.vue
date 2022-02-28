<template lang="html">
    <div class="ps-product--detail ps-product--quickview">
        <div class="ps-product__header">
            <thumbnail-quick-view :product="product" />
            <information-quick-view :product="product" />
        </div>
    </div>
</template>

<script>
import InformationQuickView from '~/components/elements/detail/information/InformationQuickView';
import ThumbnailQuickView from '~/components/elements/detail/thumbnail/ThumbnailQuickView';
export default {
    name: 'ProductQuickview',
    components: { ThumbnailQuickView, InformationQuickView },
    props: {
        product: {
            type: Object,
            default: {}
        }
    }
};
</script>

<style lang="scss" scoped></style>
