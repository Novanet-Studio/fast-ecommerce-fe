<template>
  <!-- table ps-table--responsive ps-table--shopping-cart -->
  <div class="overflow-auto">
    <table class="w-full mb-4 text-dark-200">
      <thead class="align-bottom">
        <tr>
          <th class="text-left px-5 py-4 uppercase text-dark-300 font-semibold bg-light-200 align-bottom">Producto</th>
          <th class="px-5 py-4 uppercase text-dark-300 font-semibold bg-light-200 align-bottom">Precio</th>
          <th class="px-5 py-4 uppercase text-dark-300 font-semibold bg-light-200 align-bottom">Cantidad</th>
          <th class="px-5 py-4 uppercase text-dark-300 font-semibold bg-light-200 align-bottom">Total</th>
          <th class="px-5 py-4 uppercase text-dark-300 font-semibold bg-light-200 align-bottom text-right">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <template v-for="parentItem in item">
          <tr v-for="productItem in parentItem.data.products.data" :key="productItem.id">
            <td
              class="min-w-52 px-[10px] py-[20px] align-middle text-base w-[22.5rem] border-t-2 border-t-gray-200 md:text-center lg:min-w-auto">
              <product-shopping-cart :product="productItem" />
            </td>
            <td class="px-[10px] py-[20px] align-middle text-base border-t-2 border-t-gray-200 md:text-center">$
              {{ productItem.attributes.price }}</td>
            <td
              class="px-[10px] py-[20px] align-middle text-base w-[22.5rem] border-t-2 border-t-gray-200 md:text-center">
              <quantity :product="productItem" />
            </td>
            <total-quantity :product="productItem" />
            <td
              class="px-[10px] py-[20px] align-middle text-base w-[22.5rem] border-t-2 border-t-gray-200 md:text-center">
              <a href="#" class="text-2xl text-right" @click.prevent="handleRemoveProductFromCart(productItem)">
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
import { GetProductById } from '~/modules/product/queries';

type Props = {
  item: ProductsResponse[];
}

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

  const productPromises = itemsId.map((id: string) => graphql<ProductsResponse>(GetProductById, { id }));

  const response = await Promise.all(productPromises);

  product.cartProducts = response;
}

const handleRemoveProductFromCart = (product: Product) => {
  const cartItem = cart.cartItems.find(
    item => item.id === product.id
  );

  cart.removeProductFromCart(cartItem);
  loadCartProducts();
}
</script>
