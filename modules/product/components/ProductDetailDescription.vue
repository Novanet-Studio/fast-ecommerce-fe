<template>
  <div class="ps-product__desc">
    <!-- <p>
            Sold By:
            <nuxt-link to="/shop">
                <strong> vendedor</strong>
                <strong> {{ product.vendor }}</strong>
            </nuxt-link>
        </p> -->
    <ul class="">
      <li class="lista-des">{{ product.attributes.description }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>

type Props = {
  product: any;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.lista-des {
  list-style: none !important;
}
</style>
