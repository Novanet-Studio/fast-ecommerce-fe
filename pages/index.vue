<template>
  <div>
    <home-banner />
    <template v-if="isLoading">
      <div class="animate-pulse my-8 flex flex-col">
        <div class="w-full h-12 bg-gray-200"></div>
        <div class="flex gap-8">
          <div class="w-60 h-56 bg-gray-100 mt-8 flex flex-col items-center p-4">
            <div class="w-full h-32 bg-gray-200"></div>
            <div class="w-full h-4 bg-gray-200 mt-4"></div>
            <div class="w-12 h-4 bg-gray-200 mt-4 self-start"></div>
          </div>
          <div class="w-60 h-56 bg-gray-100 mt-8 flex flex-col items-center p-4">
            <div class="w-full h-32 bg-gray-200"></div>
            <div class="w-full h-4 bg-gray-200 mt-4"></div>
            <div class="w-12 h-4 bg-gray-200 mt-4 self-start"></div>
          </div>
        </div>
      </div>
    </template>
    <template v-if="!isLoading && categories.length">
      <div v-for="category in categories" :key="category.id">
        <product-landing :category="category" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layoutTransition: {
    name: 'zoom'
  },
  pageTransition: {
    name: 'zoom'
  }
});

const { categories, isLoading } = useCategory({ ordered: true });
</script>
