<template lang="html">
    <div class="ps-product__specification">
        <nuxt-link to="/page/blank">
            <a class="report">Report Abuse</a>
        </nuxt-link>
        <p><strong>SKU:</strong> SF1133569600-1</p>
        <p class="categories">
            <strong> Categories:</strong>
            <nuxt-link to="/shop">
                <a>Consumer Electronics</a>
            </nuxt-link>
            <nuxt-link to="/shop">
                <a>Refrigerator</a>
            </nuxt-link>
            <nuxt-link to="/shop">
                <a>Babies & Moms</a>
            </nuxt-link>
        </p>
        <p class="tags">
            <strong> Tags</strong>
            <nuxt-link to="/shop">
                <a>sofa</a>
            </nuxt-link>
            <nuxt-link to="/shop">
                <a>technologies</a>
            </nuxt-link>
            <nuxt-link to="/shop">
                <a>wireless</a>
            </nuxt-link>
        </p>
    </div>
</template>

<script>
export default {
    name: 'ModuleProductDetailSpecification'
};
</script>

<style lang="scss" scoped></style>
