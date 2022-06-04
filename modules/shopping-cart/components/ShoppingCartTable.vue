<template>
  <table class="table ps-table--responsive ps-table--shopping-cart">
    <thead>
      <tr>
        <th>Producto</th>
        <th>Precio</th>
        <th>Cantidad</th>
        <th>Total</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="productItem in product.cartProducts.data" :key="productItem.id">
        <td data-label="Product">
          <product-shopping-cart :product="productItem" />
        </td>
        <td data-label="Price" class="price">$ {{ productItem.attributes.price }}</td>
        <td data-label="Quantity">
          <quantity :product="productItem" />
        </td>
        <total-quantity :product="productItem" />
        <td data-label="Action">
          <a href="#" @click.prevent="handleRemoveProductFromCart(productItem)">
            <i class="icon-cross"></i>
          </a>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';

const cart = useCart();
const product = useProduct();

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  await product.getCartProducts(itemsId);
}
const handleRemoveProductFromCart = (product: any) => {
  const cartItem = cart.cartItems.find(
    item => item.id === product.id
  );

  cart.removeProductFromCart(cartItem);
  loadCartProducts();
}
</script>
