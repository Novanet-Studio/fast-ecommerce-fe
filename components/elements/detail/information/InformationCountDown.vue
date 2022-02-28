<template lang="html">
    <div class="ps-product__info">
        <module-product-info :product="product" />
        <module-product-detail-desc :product="product" />

        <div class="ps-product__countdown">
            <figure>
                <figcaption>
                    Don't Miss Out! This promotion will expires in
                </figcaption>
                <count-down
                    time="12 30 2020, 12:00 am"
                    format="MM DD YYYY, h:mm a"
                />
            </figure>
            <figure>
                <figcaption>Sold Items</figcaption>
                <div
                    class="ps-product__progress-bar ps-progress"
                    data-value="13"
                >
                    <div class="ps-progress__value">
                        <span></span>
                    </div>
                    <p><b>20/85</b> Sold</p>
                </div>
            </figure>
        </div>

        <module-product-shopping-no-action />

        <module-product-detail-specification />

        <module-product-detail-sharing />
    </div>
</template>

<script>
import ModuleProductDetailSharing from '~/components/elements/detail/information/modules/ModuleProductDetailSharing';
import ModuleProductDetailSpecification from '~/components/elements/detail/information/modules/ModuleProductDetailSpecification';
import ModuleProductDetailDesc from '~/components/elements/detail/information/modules/ModuleProductDetailDesc';
import Rating from '~/components/elements/Rating';
import CountDown from '~/components/elements/commons/CountDown';
import ModuleProductInfo from '~/components/elements/detail/information/modules/ModuleProductInfo';
import ModuleProductShoppingNoAction from '~/components/elements/detail/information/modules/ModuleProductShoppingNoAction';

export default {
    name: 'InformationCountDown',
    components: {
        ModuleProductShoppingNoAction,
        ModuleProductInfo,
        CountDown,
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
