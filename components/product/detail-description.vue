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
