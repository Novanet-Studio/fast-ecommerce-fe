<template>
  <main>
    <home-banner />
    <template v-if="categories !== null">
      <div v-for="category in orderedCategories" :key="category.id">
        <product-landing :category="category" />
      </div>
    </template>
  </main>
</template>

<script lang="ts" setup>
definePageMeta({
  layoutTransition: {
    name: 'zoom'
  }
});

// TODO: load categories from store
const categories = ref([]);

// TODO: order categories
const orderedCategories = ref([]);
</script>
