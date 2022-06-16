<template>
  <div class="mt-8 max-w-sm md:max-w-xl lg:(px-4 mt-0 max-w-full)">
    <div v-if="cart.cartItems?.length" class="w-full px-3 mx-auto lg:max-w-[1230px]">
      <div class="pb-12 text-center lg:pb-[6.25rem]">
        <h1 class="text-3xl font-semibold text-yellow-400 lg:text-5xl">Carrito de compras</h1>
      </div>
      <div>
        <shopping-cart-table v-if="product.cartProducts?.length" :item="product.cartProducts" />
        <p v-else>Carrito vacio</p>
        <div class="py-[1.875rem] flex flex-row flex-nowrap justify-between">
          <nuxt-link to="#"
            class="inline-block px-[45px] py-[15px] text-base rounded-sm bg-yellow-400 transition ease hover:bg-yellow-500 active:bg-yellow-500 cursor-pointer">
            <i class="icon-arrow-left mr-2"></i>
            Regresar
          </nuxt-link>
        </div>
      </div>
      <!-- ps-section__footer -->
      <div>
        <div class="grid lg:grid-cols-3">
          <div class="mb-8 lg:mb-0">
            <figure>
              <figcaption class="relative block text-xl text-dark-200 mb-9">Cupon de descuento</figcaption>
              <the-input v-model="ref('').value" />
              <!-- TODO: add outline style -->
              <the-button text="Aplicar"
                class="!bg-transparent border border-yellow-400 mt-4 text-yellow-500 hover:(!bg-yellow-400  text-white)" />
            </figure>
          </div>
          <div></div>
          <div>
            <div class="mb-8 px-8 py-7 bg-light-100 border">
              <div class="block mb-5 border-b border-light-700 text-dark-100">
                <p class="flex justify-between">
                  Subtotal <span> ${{ cart.amount }} </span>
                </p>
              </div>
              <!-- ps-block__content -->
              <div>
                <ul class="ps-block__product">
                  <template v-for="productList in product.cartProducts">
                    <li class="border-b border-b-light-700 pb-5 mb-5" v-for="item in productList.data.products.data"
                      :key="item.id">
                      <span class="block text-base">
                        <nuxt-link :to="`/product/${item.id}`" class="ps-product__title">
                          {{ item.attributes.name }}
                          <br />
                          <quantity-section :product="item" />
                        </nuxt-link>
                      </span>
                    </li>
                  </template>
                </ul>
                <h3 class="mb-0 text-2xl flex justify-between text-yellow-500">
                  Total <span class="font-semibold text-red-500">${{ cart.amount }}</span>
                </h3>
              </div>
            </div>
            <!-- <nuxt-link to="/checkout" class="ps-btn ps-btn--fullwidth">
              Proceder a la compra
            </nuxt-link> -->
            <the-button text="Proceder a la compra" class="mb-24" />
            <!-- <button @click.prevent="goToCheckout">
              Proceder a la compra
            </button> -->
          </div>
        </div>
      </div>
    </div>
    <div v-else class="w-full px-3 mx-auto lg:max-w-[1230px]">
      <div class="text-center pb-[6.25rem]">
        <h1 class="text-5xl font-semibold text-yellow-400">Carrito de compras</h1>
      </div>
      <div>
        <h3 class="empy-cart">No tiene elementos agregado al carrito actualmente</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProductById } from '~/modules/product/queries';

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
}

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!itemsId.length) return;

  // TODO: move this to store
  // await product.getCartProducts(itemsId);

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const productPromises = itemsId.map((id: string) => graphql<ProductsResponse>(GetProductById, { id }));

  const response = await Promise.all(productPromises);

  product.cartProducts = response;
}

onMounted(() => {
  loadCartProducts();
});

</script>
