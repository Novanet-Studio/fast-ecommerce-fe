import { categories as categoriesQuery } from '~/graphql';
import type { Ref } from 'vue';

interface Params {
  ordered?: boolean;
}

interface Result {
  categories: Ref<Category[]>;
  isLoading: Ref<boolean>;
}

export default function useCategory(params?: Params): Result {
  const categories = ref<Category[]>([]);
  const isLoading = ref<boolean>(false);
  const graphql = useStrapiGraphQL();
  const { $notify } = useNuxtApp();

  const getCategories = async () => {
    try {
      isLoading.value = true;
      const response = await graphql<CategoriesResponse>(categoriesQuery);

      if (params?.ordered) {
        const ordered = response.data.categories.data.sort(
          (a: Category, b: Category) => Number(a.id) - Number(b.id)
        );
        categories.value = ordered;
        return;
      }

      categories.value = response.data.categories.data;
    } catch (error) {
      console.log(error);
      $notify({
        group: '',
        title: 'Error',
        text: 'Hubo un error al intentar cargar las categorias',
      });
      categories.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  onMounted(() => {
    getCategories();
  });

  return {
    categories,
    isLoading,
  };
}
