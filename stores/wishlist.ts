import { defineStore } from 'pinia';

type WishListItem = {
  id: string;
};

interface InitWishListParams {
  items: WishListItem[];
  total: number;
}

export const useWishlistStore = defineStore(
  'ecommerce-wishlist',
  () => {
    const items = ref<WishListItem[]>([]);
    const total = ref<number>(0);
    const loading = ref<boolean>(false);

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
      initWishList,
      addItem,
      removeItem,
    };
  },
  {
    persist: true,
  }
);
