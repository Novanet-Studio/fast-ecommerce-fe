import { defineStore } from 'pinia';

type CartItem = {
  id: string;
  quantity: number;
};

const calculateAmount = (items: number) =>
  Object.values(items)
    .reduce(
      (acc: number, { quantity, price }: { quantity: number; price: number }) =>
        acc + quantity * price,
      0
    )
    .toFixed(2);

export const useCart = defineStore('cart', {
  state: () => ({
    total: 0,
    amount: 0,
    cartItems: [] as CartItem[],
    loading: false,
  }),
  actions: {
    initCart(
      total = 0,
      amount = 0,
      cartItems = [] as CartItem[],
      loading = false
    ) {
      this.total = total;
      this.amount = amount;
      this.cartItems = cartItems;
      this.loading = loading;
    },
    addItem(payload: CartItem) {
      if (this.cartItems !== null) {
        let existItem = this.cartItems.find((item) => item.id === payload.id);
        if (existItem) {
          existItem.quantity += payload.quantity;
        } else {
          this.cartItems.push(payload);
        }
        this.total++;
      } else {
        this.cartItems.push(payload);
        this.total = 1;
      }
      this.amount = calculateAmount(this.cartItems);
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

    removeProductFromCart(payload) {
      this.removeItem(payload);
    },

    increaseCartItemQuantity(payload: Product) {
      this.increaseItemQuantity(payload);
    },

    decreaseCartItemQuantity(payload) {
      this.decreaseItemQuantity(payload);
    },

    clearCart() {
      this.clearCartItems();
    },
  },
  persist: true,
});
