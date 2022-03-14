<template lang="html">
    <div> 
        <!-- <h1>{{ product.title }}</h1> -->
        <h1>{{ product.name }}</h1>
        <div class="ps-product__meta">
            <!-- <p>
                Tipo:
                <nuxt-link to="/shop">
                    <a class="ml-2 text-capitalize">
                        {{product.category.name }}
                    </a>
                </nuxt-link>
            </p> -->
            <div class="ps-product__rating">
                <rating />
                <span>(1 review)</span>
            </div>
        </div>
        <h4 v-if="product.is_sale === true" class="ps-product__price sale">
            <del class="mr-2"> $ {{ product.sale_price }}</del>
            ${{ product.price}}
        </h4>
        <h4 v-else class="ps-product__price">
            ${{ product.price }}
        </h4>
    </div>
</template>

<script>
import Rating from '~/components/elements/Rating';
export default {
    name: 'ModuleProductInfo',
    components: { Rating },
    props: {
        product: {
            Type: Object,
            default: {}
        }    
    },

};
</script>

<style lang="scss" scoped></style>
