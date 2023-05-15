import { defineStore } from 'pinia';

type WishListItem = {
  id: string;
};

type WishlistStore = {
  items: WishListItem[];
  total: number;
  loading: boolean;
};

const defaultValues = {
  items: [],
  total: 0,
  loading: false,
};

export const useWishList = defineStore('wishlist', {
  state: (): WishlistStore => ({
    ...defaultValues,
  }),
  actions: {
    initWishList(payload: { items: { id: string }[]; total: number }): void {
      this.items = payload.items;
      this.total = payload.total;
    },
    addItemToWishlist(item: { id: string }) {
      if (!this.total) {
        this.items = [item];
        this.total = this.total + 1;
        return;
      }

      const existItem = this.items?.find((product) => product.id === item.id);

      if (!existItem) {
        this.items?.push(item);
        this.total = this.total + 1;
      }
    },
    removeItemFromWishlist(item: Product) {
      const index = this.items!.findIndex((product) => product.id === item.id);
      this.total = this.total - 1;
      this.items?.splice(index, 1);
    },
  },
  persist: true,
});
