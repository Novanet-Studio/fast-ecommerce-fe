import { defineStore } from 'pinia';

type WishListItem = {
  id: string;
};

type WishlistStore = {
  items: WishListItem[] | null;
  total: number;
  loading: boolean;
};

export const useWishList = defineStore('wishlist', {
  state: () =>
    ({
      items: null,
      total: 0,
      loading: false,
    } as WishlistStore),
  actions: {
    initWishList(payload: any): void {
      this.items = payload.items;
      this.total = payload.total;
    },
    addItemToWishlist(item: Product) {
      if (!this.total) {
        this.items?.push({
          id: item.id,
        });
        this.total = this.total + 1;
        return;
      }

      const existItem = this.items?.find((product) => product.id === item.id);

      if (!existItem) {
        this.items?.push({
          id: item.id,
        });
        this.total = this.total + 1;
      }
    },
    removeItemFromWishlist(item: Product) {
      const index = this.items!.findIndex((product) => product.id === item.id);
      this.total = this.total - 1;
      this.items?.splice(index, 1);
    },
  },
});
