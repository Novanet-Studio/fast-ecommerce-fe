<template lang="html">
    <div class="ps-product__info">
        <module-product-info :product="product" />

        <module-product-detail-desc :product="product" />

        <module-product-shopping :product="product" />

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
import ModuleProductShopping from '~/components/elements/detail/information/modules/ModuleProductShopping';
import ModuleProductInfo from '~/components/elements/detail/information/modules/ModuleProductInfo';

export default {
    name: 'InformationDefault',
    components: {
        ModuleProductInfo,
        ModuleProductShopping,
        Rating,
        ModuleProductDetailDesc,
        ModuleProductDetailSpecification,
        ModuleProductDetailSharing
    },
    computed: {
        ...mapState({
            product: state => state.product.product
        })
    }
};
</script>

<style lang="scss" scoped></style>
