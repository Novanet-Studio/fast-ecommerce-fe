import { defineStore } from 'pinia';
import links from '~/modules/shared/public/data/account-links.json';
type Currency = '$' | '€' | 'Bs';

export const useApp = defineStore('app', {
  state: () => ({
    appDrawer: false,
    currentDrawerContent: null,
    currency: '$',
  }),
  getters: {
    getLinks() {
      return links.data;
    },
  },
  actions: {
    async nuxtServerInit() {
      console.log('setting store');
      // const cartItems = this.$cookies.get('cart', { parseJSON: true });
      // const wishlistItems = this.$cookies.get('wishlist', {
      //   parseJSON: true,
      // });
      // const compareItems = this.$cookies.get('compare', { parseJSON: true });
      // const auth = this.$cookies.get('auth', { parseJSON: true });
      // const currency = this.$cookies.get('currency', { parseJSON: true });
      // if (cartItems && cartItems.cartItems.length > 0) {
      //   commit('cart/initCart', {
      //     cartItems: cartItems.cartItems,
      //     total: cartItems.total,
      //     amount: cartItems.amount,
      //   });
      //   let query = [];
      //   cartItems.cartItems.forEach((item) => {
      //     query.push(item.id);
      //   });
      //   await dispatch('product/getCartProducts', query);
      // }
      // if (wishlistItems) {
      //   commit('wishlist/initWishlist', {
      //     items: wishlistItems.items,
      //     total: wishlistItems.total,
      //   });
      // }
      // if (compareItems) {
      //   commit('compare/initCompare', {
      //     items: compareItems.items,
      //     total: compareItems.total,
      //   });
      // }
      // if (auth) {
      //   commit('auth/setIsLoggedIn', Boolean(auth.isLoggedIn));
      // }
      // if (currency) {
      //   commit('app/setCurrency', currency.data);
      // }
    },
    changeCurrency(currency: Currency) {
      this.currency = currency;
      // const cookieParams = {
      //   data: this.currency,
      // };
      // this.$cookies.set('currency', cookieParams, {
      //     path: '/',
      //     maxAge: 60 * 60 * 24 * 7
      // });
    },
  },
});
