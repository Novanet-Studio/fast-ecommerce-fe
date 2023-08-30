import mapper from 'smapper';
import { GetCategories } from '~/graphql/queries';
import type { Ref } from 'vue';

interface Params {
  ordered?: boolean;
}

interface Result {
  categories: Ref<Category[]>;
  isLoading: Ref<boolean>;
}

export default function useCategory(params?: Params): Result {
  const categories = useState<Category[]>('categories', () => []);
  const isLoading = useState<boolean>('isCategoriesLoading', () => false);

  const graphql = useStrapiGraphQL();
  const { $notify } = useNuxtApp();

  const getCategories = async () => {
    try {
      isLoading.value = true;
      const response = await graphql<CategoriesRequest>(GetCategories);

      if (params?.ordered) {
        const ordered = response.data.categories.data.sort(
          (a: CategoriesData, b: CategoriesData) => Number(a.id) - Number(b.id)
        );
        categories.value = mapper<Category[]>(ordered);
        return;
      }

      categories.value = mapper(response.data.categories.data);
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
