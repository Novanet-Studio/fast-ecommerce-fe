<template>
  <table-wrapper>
    <table class="min-w-full">
      <thead class="border-b">
        <tr>
          <th
            scope="col"
            class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
          >
            Producto
          </th>
          <th
            scope="col"
            class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
          >
            Precio
          </th>
          <th
            scope="col"
            class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
          >
            Cantidad
          </th>
          <th
            scope="col"
            class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
          >
            Total
          </th>
          <th
            scope="col"
            class="text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base"
          >
            Acciones
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          class="border-b transition duration-300 ease-in-out hover:bg-color-8 group"
          v-for="product in products"
          :key="product!.id"
        >
          <td
            class="px-6 py-4 whitespace-nowrap text-sm font-bold text-color-6 p-2 lg:text-base"
          >
            <product-shopping-cart
              image-class="!h-auto !w-18"
              :id="product!.id"
              :title="product!.name"
              :product="product!"
            />
          </td>
          <td
            class="text-sm text-color-4 font-light px-6 py-4 whitespace-nowrap lg:text-base"
          >
            ${{ product!.price }}
          </td>
          <td
            class="text-sm text-color-2 font-light px-6 py-4 whitespace-nowrap lg:text-base"
          >
            <quantity class="group-hover:bg-white" :id="product!.id" />
          </td>
          <td
            class="text-sm text-color-4 font-light px-6 py-4 whitespace-nowrap lg:text-base"
          >
            <total-quantity
              class="!border-none"
              :id="product!.id"
              :price="product!.price"
            />
          </td>
          <td
            class="text-sm text-color-4 font-light px-6 py-4 whitespace-nowrap lg:text-base"
          >
            <a
              href="#"
              class="cart-table__link"
              @click.prevent="handleRemoveProductFromCart(product)"
            >
              <ph-x weight="light" />
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </table-wrapper>
</template>

<script lang="ts" setup>
import { PhX } from '@phosphor-icons/vue';
import { GetProductById } from '~/graphql/queries';

const graphql = useStrapiGraphQL();
const cart = useCartStore();
const productStore = useProductStore();
const products = productStore.cartProducts;

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!cart.cartItems.length) {
    productStore.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductRequest>(GetProductById, { id })
  );

  const [response] = await Promise.all(productPromises);

  productStore.cartProducts = mapperData(response.data.products.data);
};

const handleRemoveProductFromCart = (product?: Product) => {
  const cartItem = cart.cartItems.find((item) => item.id === product!.id);

  cart.removeProductFromCart(cartItem as any);
  // loadCartProducts();
};
</script>

<style scoped>
.cart-table-container {
  @apply overflow-auto;
}

.cart-table {
  @apply w-full mb-4 text-dark-200;
}

.cart-table__thead {
  @apply align-bottom;
}

.cart-table__th {
  @apply px-5 py-4 uppercase text-dark-300 font-semibold bg-light-200 align-bottom;
}

.cart-table__td {
  @apply px-[10px] py-[20px] align-middle text-base w-[22.5rem] border-t-2 border-t-gray-200 md:text-center;
}

.cart-table__td-product {
  @apply min-w-52 px-[10px] py-[20px] align-middle text-base w-[22.5rem] border-t-2 border-t-gray-200 md:text-center lg:min-w-auto;
}

.cart-table__link {
  @apply text-2xl text-right;
}
</style>
