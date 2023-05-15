import { getProductById as GetProductById } from '~/graphql';
import { defineStore } from 'pinia';

type CartStore = {
  total: number;
  amount: number;
  cartItems: CartItem[];
  loading: boolean;
};

const calculateAmount = (items: CartItem[]): number => {
  const result = Object.values(items)
    .reduce(
      (
        acc: number,
        { quantity, price }: { quantity: number; price: number }
      ): number => acc + quantity * price,
      0
    )
    .toFixed(2);

  return Number(result);
};

const defaultValues = {
  total: 0,
  amount: 0,
  cartItems: [],
  loading: false,
};

export const useCart = defineStore('cart', {
  state: (): CartStore => ({
    ...defaultValues,
  }),
  actions: {
    // initCart(
    //   total = 0,
    //   amount = 0,
    //   cartItems = [] as CartItem[],
    //   loading = false
    // ) {
    //   this.total = total;
    //   this.amount = amount;
    //   this.cartItems = cartItems;
    //   this.loading = loading;
    // },
    async loadCartProducts() {
      const graphql = useStrapiGraphQL();
      const { $store } = useNuxtApp();
      const cart = $store.cart();
      const product = $store.product();
      cart.loading = true;

      const itemsId = cart.cartItems.map((item) => item.id);

      if (!cart.cartItems.length) {
        product.cartProducts = null;
        return;
      }

      const productPromises = itemsId.map((id: string) =>
        graphql<ProductsResponse>(GetProductById, { id })
      );

      const [response] = await Promise.all(productPromises);
      const result = mapperData<ProductsMapped[]>(response.data.products.data);
      product.cartProducts = result;
      cart.loading = false;
    },
    addItem(payload: CartItem) {
      if (!this.cartItems) {
        this.cartItems = [payload];
        this.total = 1;
        this.amount = calculateAmount(this.cartItems);
        return;
      }

      const item = this.cartItems.find((item) => item.id === payload.id);

      if (!item) {
        this.cartItems.push(payload);
      } else {
        item.quantity += payload.quantity;
      }

      this.total++;
      this.amount = calculateAmount(this.cartItems);

      // if (this.cartItems !== null) {
      //   let existItem = this.cartItems.find((item) => item.id === payload.id);
      //   if (existItem) {
      //     existItem.quantity += payload.quantity;
      //   } else {
      //     this.cartItems.push(payload);
      //   }
      //   this.total++;
      // } else {
      //   this.cartItems.push(payload);
      //   this.total = 1;
      // }
      // this.amount = calculateAmount(this.cartItems);
    },
    removeItem(payload: CartItem) {
      const index = this.cartItems.findIndex((item) => item.id === payload.id);
      this.total = this.total - payload.quantity;
      this.cartItems.splice(index, 1);
      this.amount = calculateAmount(this.cartItems);
      if (this.cartItems.length === 0) {
        this.cartItems = [];
        this.amount = 0;
        this.total = 0;
      }
    },
    removeFromProductStore(payload: CartItem) {
      const { $store } = useNuxtApp();
      const product = $store.product();
      const index = product.cartProducts?.findIndex(
        (item) => item.id === payload.id
      );

      product.cartProducts?.splice(index as number, 1);
    },
    increaseItemQuantity(payload: Product) {
      let selectedItem = this.cartItems.find((item) => item.id === payload.id);
      if (selectedItem) {
        selectedItem.quantity++;
        this.total++;
        this.amount = calculateAmount(this.cartItems);
      }
    },
    decreaseItemQuantity(payload: CartItem) {
      let selectedItem = this.cartItems.find((item) => item.id === payload.id);
      if (selectedItem && selectedItem.quantity > 1) {
        selectedItem.quantity--;
        this.total--;
        this.amount = calculateAmount(this.cartItems);
      }
    },

    clearCartItems() {
      this.cartItems = [];
      this.amount = 0;
      this.total = 0;
    },

    addProductToCart(payload: CartItem) {
      this.addItem(payload);
    },

    removeProductFromCart(payload: CartItem) {
      this.removeItem(payload);
      this.removeFromProductStore(payload);
    },

    increaseCartItemQuantity(payload: Product) {
      this.increaseItemQuantity(payload);
    },

    decreaseCartItemQuantity(payload: CartItem) {
      this.decreaseItemQuantity(payload);
    },

    clearCart() {
      this.clearCartItems();
    },
  },
  persist: true,
});
