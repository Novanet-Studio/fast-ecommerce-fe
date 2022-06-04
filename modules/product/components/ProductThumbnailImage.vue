<template>
  <nuxt-link :to="`/product/${product.id}`">
    <img :src="`${product.attributes.images.data[0].attributes.formats.small.url}`" :alt="`${product.attributes.name}`"
      class="img" />
  </nuxt-link>
</template>

<script lang="ts" setup>

// TODO: Move this type to correct location
type Product = {
  id: string;
  attributes: {
    name: string;
    images: {
      data: {
        attributes: {
          formats: {
            small: {
              url: string;
            }
          }
        }
      }[]
    }
  }
}

type Props = {
  product: Product;
}

defineProps<Props>();
</script>
