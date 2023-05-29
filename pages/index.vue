<template>
  <div>
    <home-banner />
    <product-loader v-if="isLoading" />
    <template v-if="!isLoading && categories.length">
      <product-landing
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </template>
  </div>
</template>

<script lang="ts" setup>
const { categories, isLoading } = useCategory({ ordered: true });
</script>
