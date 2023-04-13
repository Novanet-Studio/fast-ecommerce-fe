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
              <i class="icon-arrow-left mr-2"></i>
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
              <app-input v-model="ref('').value" />
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
