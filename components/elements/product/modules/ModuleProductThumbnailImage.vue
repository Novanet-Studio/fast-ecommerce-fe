<template lang="html">
    <nuxt-link :to="`/product/${product.id}`">
        <img
            <!-- :src="`${baseUrl}${product.image[0].formats.thumbnail.url}`" -->
            :alt="`${ product.name }`"
        />
    </nuxt-link>
</template>

<script>
import { baseUrl } from '~/repositories/Repository';
export default {
    name: 'ModuleProductThumbnailImage',
    props: {
        product: []
    },
    mounted(){
        this.src()
        return this.product
    },
    computed: {
        baseUrl() {
            return baseUrl;
        },

        // :src="`${baseUrl}${product.image[0].formats.thumbnail.url}`"

    },
    methods: {
        src(){
            let srcImg = this.baseUrl + this.product

        }
    }


};
</script>

<style lang="scss" scoped>

</style>
