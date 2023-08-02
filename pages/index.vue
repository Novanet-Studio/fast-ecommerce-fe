<script lang="ts" setup>
const { isLoading, categories } = useCategory({ ordered: true });
</script>

<template>
  <section>
    <app-banner />
    <product-loader v-if="isLoading" />
    <template v-else>
      <product-landing v-for="category in categories" :key="category.id" :category="category" />
    </template>
  </section>
</template>
