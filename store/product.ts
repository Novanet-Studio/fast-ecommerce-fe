import { defineStore } from 'pinia';
import { getProductsByCategoryId } from '~/graphql';

interface ProductStore {
  product: unknown | null;
  products: Product[] | null;
  // searchResults: unknown | null;
  cartProducts: ProductsMapped[] | null;
  wishlistItems: ProductsMapped[] | null;
  // compareItems: unknown | null;
  // brands: unknown | null;
  categories: unknown | null;
  total: number;
  loading: boolean;
}

export const useProduct = defineStore('product', {
  state: () =>
    ({
      product: null,
      products: null,
      // searchResults: null,
      cartProducts: null,
      wishlistItems: null,
      // compareItems: null,
      // brands: null,
      categories: null,
      // total: 0,
      loading: false,
    } as ProductStore),
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
