<template lang="html">
    <div class="ps-product--detail ps-product--fullwidth">
        <div class="ps-product__header">
            <thumbnail-default :product="product" />
            <information-default :product="product" />
        </div>
        <!-- <default-description /> -->
    </div>
</template>

<script>
import DefaultDescription from '~/components/elements/detail/modules/DefaultDescription';
import InformationDefault from '~/components/elements/detail/information/InformationDefault';
import ThumbnailDefault from '~/components/elements/detail/thumbnail/ThumbnailDefault';
export default {
    name: 'ProductDetailFullwidth',
    components: { ThumbnailDefault, InformationDefault, DefaultDescription },
    props: {
        product: '',
    },

};
</script>

<style lang="scss" scoped></style>
