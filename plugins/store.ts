import {
  useAuth,
  useCart,
  useCheckout,
  // useCollection,
  // useCompare,
  useGlobal,
  useInvoice,
  useProduct,
  // useShop,
  useWishList,
} from '../store';

export default defineNuxtPlugin(() => ({
  provide: {
    store: {
      auth: useAuth,
      cart: useCart,
      checkout: useCheckout,
      // collection: useCollection,
      // compare: useCompare,
      global: useGlobal,
      invoice: useInvoice,
      product: useProduct,
      // shop: useShop,
      wishlist: useWishList,
    },
  },
}));
