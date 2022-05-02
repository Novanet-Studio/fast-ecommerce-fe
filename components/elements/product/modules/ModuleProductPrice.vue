<template lang="html">
    <p
        v-if="product.attributes.is_sale === true"
        class="ps-product__price sale"
    >
        ${{ product.attributes.price }}
        <del class="ml-2"> ${{ product.attributes.sale_price }}</del>
    </p>
    <p v-else class="ps-product__price">${{ product.attributes.price }}</p>
</template>

<script>
export default {
name: "ModuleProductPrice",
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
