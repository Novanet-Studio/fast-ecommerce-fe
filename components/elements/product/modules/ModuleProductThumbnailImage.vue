<template lang="html">
    <nuxt-link :to="`/product/${product.id}`">
        <img
            :src="`${baseUrl}${product.image[0].formats.thumbnail.url}`"
            :alt="`${ product.name }`"
        />
    </nuxt-link>
</template>

<script>
import { baseUrl } from '~/repositories/Repository';
export default {
    name: 'ModuleProductThumbnailImage',
    props: {
        product: ''
    },
    computed: {
        baseUrl() {
            return baseUrl;
        },
    },
    mounted(){
        console.log(this.product.image[0])
    }


};
</script>

<style lang="scss" scoped>

</style>
