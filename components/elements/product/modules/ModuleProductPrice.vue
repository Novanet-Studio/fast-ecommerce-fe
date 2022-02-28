<template lang="html">
    <p
        v-if="product.is_sale === true"
        class="ps-product__price sale"
    >
        ${{ product.price }}
        <del class="ml-2"> ${{ product.sale_price }}</del>
    </p>
    <p v-else class="ps-product__price">${{ product.price }}</p>
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
