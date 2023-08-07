import config from '~/config/config.json';
import { GetProductById } from '~/graphql/queries';

export const useCartStore = defineStore(
  config.store.cart,
  () => {
    const total = ref(0);
    const amount = ref(0);
    const cartItems = ref<CartItem[]>([]);
    const loading = ref(false);

    const productStore = useProductStore();

    const graphql = useStrapiGraphQL();

    async function loadProducts() {
      loading.value = true;

      const itemsId = cartItems.value.map((item) => item.id);

      if (!cartItems.value.length) {
        productStore.cartProducts = null;
        return;
      }

      const productPromises = itemsId.map((id: string) =>
        graphql<ProductRequest>(GetProductById, { id })
      );

      const [response] = await Promise.all(productPromises);
      const result = mapperData<Product[]>(response.data.products.data);
      productStore.cartProducts = result;
      loading.value = false;
    }

    function addProductToCart(payload: CartItem) {
      if (!cartItems.value.length) {
        cartItems.value = [payload];
        total.value = 1;
        amount.value = calculateAmount(cartItems.value);
        return;
      }

      const itemFound = cartItems.value.find((item) => item.id === payload.id);

      if (!itemFound) {
        cartItems.value.push(payload);
      } else {
        itemFound.quantity += payload.quantity;
      }

      total.value++;
      amount.value = calculateAmount(cartItems.value);
    }

    function removeItem(payload: CartItem) {
      const index = cartItems.value.findIndex((item) => item.id === payload.id);
      total.value -= payload.quantity;
      cartItems.value.splice(index, 1);
      amount.value = calculateAmount(cartItems.value);
      if (cartItems.value.length === 0) {
        cartItems.value = [];
        amount.value = 0;
        total.value = 0;
      }
    }

    function removeFromProductStore(payload: CartItem) {
      const index = productStore.cartProducts!.findIndex(
        (item) => item!.id === payload.id
      );

      productStore.cartProducts?.splice(index as number, 1);
    }

    function removeProductFromCart(payload: CartItem) {
      removeItem(payload);
      removeFromProductStore(payload);
    }

    function increaseCartItemQuantity(payload: CartItem) {
      let selectedItem = cartItems.value.find((item) => item.id === payload.id);
      if (selectedItem) {
        selectedItem.quantity++;
        total.value++;
        amount.value = calculateAmount(cartItems.value);
      }
    }

    function decreaseCartItemQuantity(payload: CartItem) {
      let selectedItem = cartItems.value.find((item) => item.id === payload.id);
      if (selectedItem && selectedItem.quantity > 1) {
        selectedItem.quantity--;
        total.value--;
        amount.value = calculateAmount(cartItems.value);
      }
    }

    function clear() {
      cartItems.value = [];
      total.value = 0;
      amount.value = 0;
    }

    function $reset() {
      total.value = 0;
      amount.value = 0;
      cartItems.value = [];
      loading.value = false;
    }

    return {
      total,
      amount,
      cartItems,
      loading,
      loadProducts,
      addProductToCart,
      removeProductFromCart,
      increaseCartItemQuantity,
      decreaseCartItemQuantity,
      clear,
      $reset,
    };
  },
  {
    persist: true,
  }
);
