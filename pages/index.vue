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
      <div v-for="category in orderedCategories" :key="category.id">
        <product-landing :category="category" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import categoriesQuery from '../modules/shared/queries/categories.gql';

const isLoading = ref(false);

definePageMeta({
  layoutTransition: {
    name: 'zoom'
  },
  pageTransition: {
    name: 'zoom'
  }
});

const { $helpers, $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();

const categories = ref<Category[]>([]);
const orderedCategories = ref<Category[]>([]);

const loadCategories = async () => {
  isLoading.value = true;
  const [{ data }, error] = await $helpers.handleAsync(graphql<CategoriesResponse>(categoriesQuery));

  if (error?.message) {
    $notify({
      group: '',
      title: 'Error',
      text: 'Hubo un error al intentar cargar las categorias',
    });
    return;
  }

  categories.value = data.categories.data;
  orderedCategories.value = data.categories.data.sort((a: Category, b: Category) => Number(a.id) - Number(b.id));
  isLoading.value = false;
}

onMounted(() => {
  loadCategories();
})
</script>
