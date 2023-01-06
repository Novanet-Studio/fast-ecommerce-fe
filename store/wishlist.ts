import { defineStore } from 'pinia';

export const useWishList = defineStore('wishlist', {
  state: () => ({
    items: [],
    total: null,
    loading: false,
  }),
  actions: {
    initWishList(payload: any): void {
      this.items = payload.items;
      this.total = payload.total;
    },
    addItemToWishlist(payload) {
      if (this.total !== null) {
        const existItem = this.items.find((item) => item.id === payload.id);
        if (!existItem) {
          this.items.push({
            id: payload.id,
          });
          this.total = this.total + 1;
        }
      } else {
        this.items.push({
          id: payload.id,
        });
        this.total = this.total + 1;
      }
      // const params = {
      //   items: this.items,
      //   total: this.total,
      // };

      // this.$cookies.set('wishlist', params, {
      //   path: '/',
      //   maxAge: 60 * 60 * 24 * 7,
      // });
    },
    removeItemFromWishlist(payload) {
      const index = this.items.findIndex((item) => item.id === payload.id);
      this.total = this.total - 1;
      this.items.splice(index, 1);
      // const params = {
      //   items: this.items,
      //   total: this.total,
      // };

      // this.$cookies.set('wishlist', params, {
      //   path: '/',
      //   maxAge: 60 * 60 * 24 * 7,
      // });
    },
  },
});
