<template>
  <div class="text-sm mb-5 border-b-2 border-b-light-200 lg:text-base">
    <ul>
      <li class="text-dark-200">{{ product.attributes.description }}</li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
}

defineProps<Props>();
</script>
