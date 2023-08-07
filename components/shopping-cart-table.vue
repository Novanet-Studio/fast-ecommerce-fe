<script lang="ts" setup>
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

<template>
  <table-wrapper>
    <table class="table">
      <thead class="table__thead">
        <tr>
          <th scope="col" class="table__th">Producto</th>
          <th scope="col" class="table__th">Precio</th>
          <th scope="col" class="table__th">Cantidad</th>
          <th scope="col" class="table__th">Total</th>
          <th scope="col" class="table__th">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr class="table__tr" v-for="product in products" :key="product!.id">
          <td class="product-td">
            <product-shopping-cart
              image-class="!h-auto !w-18"
              :id="product!.id"
              :title="product!.name"
              :product="product!"
            />
          </td>
          <td class="base-td">${{ product!.price }}</td>
          <td class="quantity-td">
            <quantity class="group-hover:bg-white" :id="product!.id" />
          </td>
          <td class="base-td">
            <total-quantity
              class="!border-none"
              :id="product!.id"
              :price="product!.price"
            />
          </td>
          <td class="base-td">
            <a
              href="#"
              class="cart-table__link"
              @click.prevent="handleRemoveProductFromCart(product)"
            >
              <div class="i-ph-x-light"></div>
            </a>
          </td>
        </tr>
      </tbody>
    </table>
  </table-wrapper>
</template>

<style scoped>
.table {
  @apply min-w-full;
}

.table__thead {
  @apply border-b;
}

.table__th {
  @apply text-sm font-bold text-color-2 px-6 py-4 text-left lg:text-base;
}

.table__tr {
  @apply border-b transition duration-300 ease-in-out hover:bg-color-8 group;
}

.product-td {
  @apply px-6 py-4 whitespace-nowrap text-sm font-bold text-color-6 p-2 lg:text-base;
}

.base-td {
  @apply text-sm text-color-4 font-light px-6 py-4 whitespace-nowrap lg:text-base;
}

.quantity-td {
  @apply text-sm text-color-2 font-light px-6 py-4 whitespace-nowrap lg:text-base;
}
</style>
