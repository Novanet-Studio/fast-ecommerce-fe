<template>
  <div class="detail-description">
    <ul>
      <li class="detail-description__item">
        {{ product.attributes.description }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
};

defineProps<Props>();
</script>
