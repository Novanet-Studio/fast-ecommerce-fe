<template lang="html">
    <div class="ps-product__info">
        <module-product-info :product="product" />

        <module-product-detail-desc :product="product" />

        <module-product-groupped />

        <module-product-shopping />

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
    name: 'InformationGroupped',
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
