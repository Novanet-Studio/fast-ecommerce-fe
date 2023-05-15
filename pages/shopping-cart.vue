<template>
  <section class="shopping-cart">
    <div class="shopping-cart__wrapper">
      <div class="shopping-cart__container" v-if="cart.cartItems?.length">
        <header class="shopping-cart__header">
          <h1 class="shopping-cart__title">Carrito de compras</h1>
        </header>
        <div>
          <shopping-cart-table
            v-if="product.cartProducts?.length"
            :products="product.cartProducts"
          />
          <p v-else>Carrito vacio</p>
          <div class="shopping-cart__link-wrapper">
            <nuxt-link to="#" class="shopping-cart__link">
              <ph-left weight="light" class="mr-2" />
              Regresar
            </nuxt-link>
          </div>
        </div>
        <div class="shopping-cart__footer">
          <div class="shopping-cart__left">
            <figure>
              <figcaption class="shopping-cart__figcaption">
                Cupon de descuento
              </figcaption>
              <app-input v-model="discount" />
              <!-- TODO: add outline style -->
              <app-button text="Aplicar" class="shopping-cart__btn" />
            </figure>
          </div>
          <div></div>
          <div>
            <div class="shopping-cart__right-wrapper">
              <div class="shopping-cart__text-wrapper">
                <p class="shopping-cart__text">
                  Subtotal <span> ${{ cart.amount }} </span>
                </p>
              </div>
              <div>
                <ul class="cart-product">
                  <li
                    class="cart-product__item"
                    v-for="item in product.cartProducts"
                    :key="item.id"
                  >
                    <span class="cart-product__wrapper">
                      <nuxt-link :to="`/product/${item.id}`">
                        {{ item.name }}
                        <br />
                        <quantity-section :product="item" />
                      </nuxt-link>
                    </span>
                  </li>
                </ul>
                <h3 class="cart-product__total">
                  Total
                  <span class="cart-product__amount">${{ cart.amount }}</span>
                </h3>
              </div>
            </div>
            <app-button
              text="Proceder a la compra"
              class="mb-24"
              @click="$router.push('/checkout')"
            />
          </div>
        </div>
      </div>
      <div v-else class="shopping-cart__container">
        <header class="shopping-cart__header">
          <h1 class="shopping-cart__title">Carrito de compras</h1>
        </header>
        <div>
          <h3 class="empy-cart">
            No tiene elementos agregado al carrito actualmente
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
});

const graphql = useStrapiGraphQL();
const router = useRouter();
const { $store } = useNuxtApp();

const cart = $store.cart();
const product = $store.product();
const discount = ref('');

const goToCheckout = async () => {
  // TODO: fix routing
  await router.push({
    path: '/checkout',
    force: true,
    replace: true,
  });
  router.go(0);
};

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!itemsId.length) return;

  // TODO: move this to store
  // await product.getCartProducts(itemsId);

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) =>
    graphql<ProductsResponse>(GetProductById, { id })
  );

  const [response] = await Promise.all(productPromises);

  product.cartProducts = mapperData(
    response.data.products.data
  ) as ProductsMapped[];
};

onMounted(() => {
  // loadCartProducts();
});
</script>

<style scoped>
.shopping-cart {
  @apply max-w-full;
}
.shopping-cart__wrapper {
  @apply mt-8 max-w-sm md:max-w-xl lg:(px-4 mt-0 max-w-full);
}
.shopping-cart__container {
  @apply w-full px-3 mx-auto lg:max-w-[1230px];
}
.shopping-cart__header {
  @apply pb-12 text-center lg:pb-[6.25rem];
}

.shopping-cart__title {
  @apply text-3xl font-semibold text-yellow-400 lg:text-5xl;
}

.shopping-cart__link-wrapper {
  @apply py-[1.875rem] flex flex-row flex-nowrap justify-between;
}

.shopping-cart__link {
  @apply inline-block px-[45px] py-[15px] text-base rounded-sm bg-yellow-400 transition ease hover:bg-yellow-500 active:bg-yellow-500 cursor-pointer;
}

.shopping-cart__footer {
  @apply grid lg:grid-cols-3;
}

.shopping-cart__left {
  @apply mb-8 lg:mb-0;
}

.shopping-cart__figcaption {
  @apply relative block text-xl text-dark-200 mb-9;
}

.shopping-cart__right-wrapper {
  @apply mb-8 px-8 py-7 bg-light-100 border;
}

.shopping-cart__text-wrapper {
  @apply block mb-5 border-b border-light-700 text-dark-100;
}

.shopping-cart__text {
  @apply flex justify-between;
}

.shopping-cart__text {
  @apply flex justify-between;
}

.shopping-cart__btn {
  @apply !bg-transparent border border-yellow-400 mt-4 text-yellow-500 hover:(!bg-yellow-400 text-white);
}

.cart-product__item {
  @apply border-b border-b-light-700 pb-5 mb-5;
}

.cart-product__wrapper {
  @apply block text-base;
}

.cart-product__total {
  @apply mb-0 text-2xl flex justify-between text-yellow-500;
}

.cart-product__amount {
  @apply font-semibold text-red-500;
}
</style>
