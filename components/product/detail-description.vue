<template>
  <div class="detail-description">
    <ul>
      <li class="detail-description__item">
        {{ product.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
const product = inject('product') as Product;
</script>

<style scoped>
.detail-description {
  @apply text-sm mb-5 border-b border-color-7 pb-2 lg:text-base;
}

.detail-description__item {
  @apply text-dark-200;
}
</style>
