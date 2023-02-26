import { defineStore } from 'pinia';
import { getProductsByCategoryId } from '~/graphql';

interface ProductStore {
  product: unknown | null;
  products: Product[] | null;
  searchResults: unknown | null;
  cartProducts: ProductsMapped[] | null;
  wishlistItems: ProductsMapped[] | null;
  compareItems: unknown | null;
  brands: unknown | null;
  categories: unknown | null;
  total: number;
  loading: boolean;
}

export const useProduct = defineStore('product', {
  state: () =>
    ({
      product: null,
      products: null,
      searchResults: null,
      cartProducts: null,
      wishlistItems: null,
      compareItems: null,
      brands: null,
      categories: null,
      total: 0,
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
    // async getProducts(payload) {
    // const reponse = await Repository.get(
    //   `${baseUrl}/products?${serializeQuery(payload)}`
    // )
    //   .then((response) => {
    //     this.products = response.data;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    // async getTotalRecords(payload) {
    // const reponse = await Repository.get(`${baseUrl}/products/count`)
    //   .then((response) => {
    //     this.total = response.data;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    // async getProductsById(payload) {
    // const reponse = await Repository.get(`${baseUrl}/products/${payload}`)
    //   .then((response) => {
    //     this.product = response.data;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // return { data: {} };
    // },
    // async getProductByKeyword(payload) {
    // const reponse = await Repository.get(
    //   `${baseUrl}/products?${serializeQuery(payload)}`
    // )
    //   .then((response) => {
    //     this.searchResults = response.data;
    //     this.total = response.data.length;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    async getCartProducts(payload: unknown) {
      // let query = '';
      // payload.forEach((item) => {
      //   if (query === '') {
      //     query = `id=${item}`;
      //   } else {
      //     query = query + `&id=${item}`;
      //   }
      // });
      // const reponse = await Repository.get(`${baseUrl}/products?${query}`)
      //   .then((response) => {
      //     this.cartProducts = response.data;
      //     return response.data;
      //   })
      //   .catch((error) => ({ error: JSON.stringify(error) }));
      // return reponse;

      return [];
    },
    // async getWishlishtProducts(payload) {
    // let query = '';
    // payload.forEach((item) => {
    //   if (query === '') {
    //     query = `id=${item}`;
    //   } else {
    //     query = query + `&id=${item}`;
    //   }
    // });
    // const reponse = await Repository.get(`${baseUrl}/products?${query}`)
    //   .then((response) => {
    //     this.wishlistItems = response.data;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    // async getCompareProducts(payload) {
    // let query = '';
    // payload.forEach((item) => {
    //   if (query === '') {
    //     query = `id=${item}`;
    //   } else {
    //     query = query + `&id=${item}`;
    //   }
    // },
    // const reponse = await Repository.get(`${baseUrl}/products?${query}`)
    //   .then((response) => {
    //     commit('setCompareItems', response.data);
    //     this.compareItems = response.data;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    // async getProductBrands({ commit }) {
    // const reponse = await Repository.get(`${baseUrl}/brands`)
    //   .then((response) => {
    //     this.brands = response.data;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    // async getProductCategories({ commit }) {
    // const reponse = await Repository.get(`${baseUrl}/product-categories`)
    //   .then((response) => {
    //     commit('setCategories', response.data);
    //     this.categories = response.data;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    // async getProductsByBrands(payload) {
    // let query = '';
    // payload.forEach((item) => {
    //   if (query === '') {
    //     query = `slug_in=${item}`;
    //   } else {
    //     query = query + `&slug_in=${item}`;
    //   }
    // });
    // const reponse = await Repository.get(`${baseUrl}/brands?${query}`)
    //   .then((response) => {
    //     if (response.data) {
    //       const brands = response.data;
    //       let products = [];
    //       brands.forEach((brand) => {
    //         brand.products.forEach((product) => {
    //           products.push(product);
    //         });
    //       });
    //       this.products = products;
    //       this.total = products.length;
    //       return products;
    //     } else {
    //       return null;
    //     }
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
    // async getProductsByPriceRange(payload) {
    // const reponse = await Repository.get(
    //   `${baseUrl}/products?${serializeQuery(payload)}`
    // )
    //   .then((response) => {
    //     this.products = response.data;
    //     this.searchResults = response.data;
    //     this.total = response.data.length;;
    //     return response.data;
    //   })
    //   .catch((error) => ({ error: JSON.stringify(error) }));
    // return reponse;
    // },
  },
});
