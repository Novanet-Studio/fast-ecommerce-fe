import { getProductById as GetProductById } from '~/graphql';

export default function useGetCartProducts() {
  const graphql = useStrapiGraphQL();
  const { $store } = useNuxtApp();
  const cart = $store.cart();
  const product = $store.product();

  const loadCartProducts = async () => {
    const itemsId = cart.cartItems.map((item) => item.id);

    if (!cart.cartItems.length) {
      product.cartProducts = null;
      return;
    }

    const productPromises = itemsId.map((id: string) =>
      graphql<ProductsResponse>(GetProductById, { id })
    );

    const response = await Promise.all(productPromises);
    product.cartProducts = response;

    cart.loading = false;
  };

  onMounted(async () => {
    await loadCartProducts();
  });
}
