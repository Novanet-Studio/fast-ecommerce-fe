<template lang="html">
    <div class="ps-product__info">
        <module-product-info :product="product" />

        <module-product-detail-desc :product="product" />

        <module-product-shopping-extended />

        <module-product-detail-specification />

        <module-product-detail-sharing />
    </div>
</template>

<script>
import ModuleProductDetailSharing from '~/components/elements/detail/information/modules/ModuleProductDetailSharing';
import ModuleProductDetailSpecification from '~/components/elements/detail/information/modules/ModuleProductDetailSpecification';
import ModuleProductDetailDesc from '~/components/elements/detail/information/modules/ModuleProductDetailDesc';
import Rating from '~/components/elements/Rating';
import ModuleProductInfo from '~/components/elements/detail/information/modules/ModuleProductInfo';
import ModuleProductShoppingExtended from '~/components/elements/detail/information/modules/ModuleProductShoppingExtended';

export default {
    name: 'InformationExtended',
    components: {
        ModuleProductShoppingExtended,
        ModuleProductInfo,
        Rating,
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
