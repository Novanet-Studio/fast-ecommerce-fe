<template>
  <div class="cart-table-container">
    <table class="cart-table">
      <thead class="cart-table__thead">
        <tr>
          <th class="cart-table__th">Producto</th>
          <th class="cart-table__th">Precio</th>
          <th class="cart-table__th">Cantidad</th>
          <th class="cart-table__th">Total</th>
          <th class="cart-table__th text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="parentItem in item">
          <tr
            v-for="productItem in parentItem.data.products.data"
            :key="productItem.id"
          >
            <td class="cart-table__td-product">
              <product-shopping-cart :product="productItem" />
            </td>
            <td class="cart-table__td">$ {{ productItem.attributes.price }}</td>
            <td class="cart-table__td">
              <quantity :product="productItem" />
            </td>
            <total-quantity :product="productItem" />
            <td class="cart-table__td">
              <a
                href="#"
                class="cart-table__link"
                @click.prevent="handleRemoveProductFromCart(productItem)"
              >
                <i class="icon-cross"></i>
              </a>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

type Props = {
  item: ProductsResponse[];
};

defineProps<Props>();

const { $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
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
};

const handleRemoveProductFromCart = (product: Product) => {
  const cartItem = cart.cartItems.find((item) => item.id === product.id);

  cart.removeProductFromCart(cartItem);
  loadCartProducts();
};
</script>
