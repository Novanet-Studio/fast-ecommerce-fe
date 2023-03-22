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
        <tr v-for="product in products" :key="product.id">
          <td class="cart-table__td-product">
            <product-shopping-cart :product="product" />
          </td>
          <td class="cart-table__td">$ {{ product.price }}</td>
          <td class="cart-table__td">
            <quantity :product="product" />
          </td>
          <total-quantity :product="product" />
          <td class="cart-table__td">
            <a
              href="#"
              class="cart-table__link"
              @click.prevent="handleRemoveProductFromCart(product)"
            >
              <i class="icon-cross"></i>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

type Props = {
  products: ProductsMapped[];
};

defineProps<Props>();

const { $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const cart = $store.cart();
const productStore = $store.product();

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!cart.cartItems.length) {
    productStore.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductsResponse>(GetProductById, { id })
  );

  const [response] = await Promise.all(productPromises);

  productStore.cartProducts = mapperData(response.data.products.data);
};

const handleRemoveProductFromCart = (product: ProductsMapped) => {
  const cartItem = cart.cartItems.find((item) => item.id === product.id);

  cart.removeProductFromCart(cartItem as any);
  // loadCartProducts();
};
</script>
