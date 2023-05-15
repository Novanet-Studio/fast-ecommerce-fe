import { defineStore } from 'pinia';
import { getProductsByCategoryId } from '~/graphql';

interface ProductStore {
  product: unknown | null;
  products: Product[] | null;
  cartProducts: ProductsMapped[] | null;
  wishlistItems: ProductsMapped[] | null;
  categories: unknown | null;
  loading: boolean;
}

const defaultValues = {
  product: null,
  products: null,
  cartProducts: null,
  wishlistItems: null,
  categories: null,
  loading: false,
};

export const useProduct = defineStore('product', {
  state: (): ProductStore => ({
    ...defaultValues,
  }),
  actions: {
    async getProductsByCategory(
      categoryId: string
    ): Promise<ProductsMapped[] | null> {
      try {
        this.loading = true;
        const gql = useStrapiGraphQL();
        const { data } = await gql<ProductsResponse>(getProductsByCategoryId, {
          id: categoryId,
        });
        const mapped = mapperData<ProductsMapped[]>(data.products.data);

        return mapped;
      } catch (error) {
        return null;
      } finally {
        this.loading = false;
      }
    },
    addCartProducts(products: ProductsMapped[]) {
      this.cartProducts = products;
    },
    clearProducts() {
      this.product = null;
      this.products = null;
      this.cartProducts = [];
      this.wishlistItems = [];
      this.categories = null;
      this.loading = false;
    },
  },
  persist: {
    storage: persistedState.localStorage,
  },
});
