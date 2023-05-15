<template>
  <div>
    <home-banner />
    <template v-if="isLoading">
      <product-loader />
    </template>
    <template v-if="!isLoading && categories.length">
      <div v-for="category in categories" :key="category.id">
        <product-landing :category="category" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
const { categories, isLoading } = useCategory({ ordered: true });
</script>
