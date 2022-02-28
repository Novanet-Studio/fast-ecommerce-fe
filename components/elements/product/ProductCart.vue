<template lang="html">
    <div class="ps-product--cart">
        <div class="ps-product__thumbnail">
            <module-product-thumbnail-image :product="product"/>
        </div>
        <div class="ps-product__content">
            <module-product-title :product="product"/>
            <nuxt-link to="/product/[pid]">
                <a class="ps-product__title">{{ product.title }}</a>
            </nuxt-link>
        </div>
    </div>
</template>

<script>
import ModuleProductThumbnailImage from '@/components/elements/product/modules/ModuleProductThumbnailImage';
import ModuleProductTitle from '@/components/elements/product/modules/ModuleProductTitle';
export default {
    components: { ModuleProductTitle, ModuleProductThumbnailImage },
    props: {
        product: {
            type: Object,
            require: true,
            default: () => {}
        }
    }
};
</script>
