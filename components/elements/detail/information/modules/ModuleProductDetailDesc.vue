<template lang="html">
    <div class="ps-product__desc">
        <p>
            Sold By:
            <nuxt-link to="/shop">
                <strong> vendedor</strong>
                <!-- <strong> {{ product.vendor }}</strong> -->
            </nuxt-link>
        </p>
        <ul class="">
            <li class="lista-des">{{ product.descripcion }}</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'ModuleProductDetailDesc',
    props: {
        product: []
    }
};
</script>

<style lang="scss" scoped>
.lista-des{

    list-style: none!important;
    
}
</style>
