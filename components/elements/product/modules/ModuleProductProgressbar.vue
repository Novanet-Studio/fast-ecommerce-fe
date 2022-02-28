<template lang="html">
    <div class="ps-product__progress-bar ps-progress">
        <div class="ps-progress__value">
            <span :style="{ width: '80%' }"></span>
        </div>
        <p
            v-if="product.inventory - product.depot >= 0"
            class="mb-0"
        >
            Sold: {{ product.inventory - product.depot }}
        </p>
        <p v-else class="mb-0">Sold: {{ product.inventory }}</p>
    </div>
</template>

<script>
export default {
name: "ModuleProductProgressbar",
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
