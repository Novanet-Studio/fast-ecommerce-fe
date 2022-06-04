<template>
  <div>
    <!-- <h1>{{ product.title }}</h1> -->
    <h1>{{ product.attributes.name }}</h1>
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
    <h4 v-if="product.attributes.is_sale === true" class="ps-product__price sale">
      <del class="mr-2"> $ {{ product.attributes.sale_price }}</del>
      ${{ product.attributes.price }}
    </h4>
    <h4 v-else class="ps-product__price">
      ${{ product.attributes.price }}
    </h4>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: any;
}

defineProps<Props>();
</script>
