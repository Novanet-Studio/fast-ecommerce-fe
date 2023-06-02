import { GetProductsByCategoryId } from '~/graphql/queries';

export const useProductStore = defineStore(
  'ecommerce-product',
  () => {
    const product = ref<Product | null>(null);
    const products = ref<Product[] | null>([]);
    const cartProducts = ref<Partial<Product[]> | null>([]);
    const wishlistItems = ref<Partial<Product[]> | null>([]);
    const loading = ref(false);

    async function getByCategory(
      categoryId: string
    ): Promise<Product[] | null> {
      try {
        loading.value = true;
        const gql = useStrapiGraphQL();
        const { data } = await gql<ProductRequest>(GetProductsByCategoryId, {
          id: categoryId,
        });

        return mapperData<Product[]>(data.products.data);
      } catch (error) {
        return null;
      } finally {
        loading.value = false;
      }
    }

    function addCartProducts(product: Partial<Product[]>) {
      cartProducts.value = product;
    }

    function clear() {
      product.value = null;
      products.value = [];
      cartProducts.value = [];
      wishlistItems.value = [];
      loading.value = false;
    }

    return {
      product,
      products,
      cartProducts,
      wishlistItems,
      loading,
      getByCategory,
      addCartProducts,
      clear,
    };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
