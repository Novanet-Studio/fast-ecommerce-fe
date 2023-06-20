<template>
  <section class="shopping-cart">
    <div class="shopping-cart__wrapper">
      <div class="shopping-cart__container" v-if="cart.cartItems?.length">
        <header class="shopping-cart__header">
          <h1 class="shopping-cart__title">Carrito de compras</h1>
        </header>
        <div>
          <shopping-cart-table v-if="product.cartProducts?.length" />
          <p v-else>Carrito vacio</p>
          <div class="shopping-cart__link-wrapper">
            <nuxt-link to="#" class="shopping-cart__link">
              <ph-arrow-left weight="light" class="mr-2" />
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
              <app-button class="shopping-cart__btn" outline>
                Aplicar
              </app-button>
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
                    :key="item!.id"
                  >
                    <span class="cart-product__wrapper">
                      <nuxt-link :to="`/product/${item!.id}`">
                        {{ item!.name }}
                        <br />
                        <quantity-section :id="item!.id" :price="item!.price" />
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
            <app-button class="mb-24" @click="$router.push('/checkout')">
              Proceder a la compra
            </app-button>
          </div>
        </div>
      </div>
      <div v-else class="shopping-cart__container">
        <header class="shopping-cart__header">
          <h1 class="shopping-cart__title">Carrito de compras</h1>
        </header>
        <div>
          <h3 class="empy-cart text-color-2 text-center text-3xl font-bold">
            No tiene elementos agregado al carrito actualmente
          </h3>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
// TODO!: Need refactor
import { PhArrowLeft } from '@phosphor-icons/vue';
import { GetProductById } from '~/graphql/queries';

definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});

const graphql = useStrapiGraphQL();

const cart = useCartStore();
const product = useProductStore();
const discount = ref('');

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
    graphql<ProductRequest>(GetProductById, { id })
  );

  const [response] = await Promise.all(productPromises);

  product.cartProducts = mapperData(response.data.products.data) as Product[];
};

onMounted(() => {
  loadCartProducts();
});
</script>

<style scoped>
.shopping-cart {
  @apply max-w-full;
}
.shopping-cart__wrapper {
  @apply mt-8 max-w-sm md:max-w-2xl lg:(px-4 mt-0 max-w-full);
}
.shopping-cart__container {
  @apply w-full px-3 mx-auto lg:max-w-[1230px];
}
.shopping-cart__header {
  @apply pb-12 text-center lg:pb-[6.25rem];
}

.shopping-cart__title {
  @apply text-3xl font-semibold text-color-2 lg:text-5xl;
}

.shopping-cart__link-wrapper {
  @apply py-[1.875rem] flex flex-row flex-nowrap justify-between;
}

.shopping-cart__link {
  @apply inline-flex items-center px-[45px] py-[15px] text-base rounded-sm bg-color-1 transition ease hover:bg-opacity-90 active:bg-opacity-90 cursor-pointer;
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
  @apply mb-8 px-8 py-7 border border-color-7;
}

.shopping-cart__text-wrapper {
  @apply block mb-5 pb-5 border-b border-color-7 text-dark-100;
}

.shopping-cart__text {
  @apply flex justify-between;
}

.shopping-cart__text {
  @apply flex justify-between;
}

.shopping-cart__btn {
  @apply !bg-transparent border border-color-2 mt-4 text-color-2 hover:(!bg-yellow-400 text-white);
}

.cart-product__item {
  @apply border-b border-color-7 pb-5 mb-5;
}

.cart-product__wrapper {
  @apply block text-base;
}

.cart-product__total {
  @apply mb-0 text-2xl flex justify-between text-color-2;
}

.cart-product__amount {
  @apply font-semibold text-red-500;
}
</style>
