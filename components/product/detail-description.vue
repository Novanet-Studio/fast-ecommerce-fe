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
type Props = {
  product: ProductsMapped;
};

defineProps<Props>();
</script>

<style scoped>
.detail-description {
  @apply text-sm mb-5 border-b-2 border-b-light-200 lg:text-base;
}

.detail-description__item {
  @apply text-dark-200;
}
</style>
