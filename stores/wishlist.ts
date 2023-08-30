import mapper from 'smapper';
import config from '~/config/config.json';
import { defineStore } from 'pinia';
import { GetProductById } from '~/graphql/queries';

type WishListItem = {
  id: string;
};

interface InitWishListParams {
  items: WishListItem[];
  total: number;
}

export const useWishlistStore = defineStore(
  config.store.wishlist,
  () => {
    const items = ref<WishListItem[]>([]);
    const total = ref<number>(0);
    const loading = ref<boolean>(false);
    const graphql = useStrapiGraphQL();
    const productStore = useProductStore();

    async function load() {
      const temp: any[] = [];

      if (!items.value.length) {
        productStore.wishlistItems = null;
        return;
      }

      const itemsId = items.value.map((item) => item.id);
      const promises = itemsId.map((id: string) =>
        graphql<ProductRequest>(GetProductById, { id })
      );

      const response = await Promise.all(promises);
      mapper<any[]>(response).forEach((item) => {
        temp.push(item.products[0]);
      });

      productStore.wishlistItems = temp;
    }

    function initWishList(params: InitWishListParams): void {
      items.value = params.items;
      total.value = params.total;
    }

    function addItem(item: WishListItem) {
      if (!total.value) {
        items.value = [item];
        total.value = total.value + 1;
        return;
      }

      const existItem = items.value?.find((product) => product.id === item.id);

      if (!existItem) {
        items.value?.push(item);
        total.value += 1;
      }
    }

    function removeItem(item: WishListItem) {
      const index = items.value!.findIndex((product) => product.id === item.id);
      total.value += -1;
      items.value?.splice(index, 1);
    }

    return {
      items,
      total,
      loading,
      load,
      initWishList,
      addItem,
      removeItem,
    };
  },
  {
    persist: true,
  }
);
