<template lang="html">
    <nuxt-link :to="`/product/${product.id}`">
        <img
            :src="`${product.attributes.images.data[0].attributes.formats.thumbnail.url}`"
            :alt="`${ product.attributes.name }`"
            class="img"
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
.img{
    width: 180px;
    height: 101px;
}
</style>
