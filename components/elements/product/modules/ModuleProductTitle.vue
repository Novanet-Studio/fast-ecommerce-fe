<template lang="html">
    <nuxt-link
        :to="`/product/${product.id}`"
        class="ps-product__title"
    >
        {{ product.attributes.name && product.attributes.name }}
    </nuxt-link>
</template>

<script>
export default {
    name: 'ModuleProductTitle',
    props: {
        product: ''
    }
};
</script>

<style lang="scss" scoped>

</style>
