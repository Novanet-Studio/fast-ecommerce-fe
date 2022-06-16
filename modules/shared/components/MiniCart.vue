<template>
  <div class="relative">
    <div @mouseover="isOpen = true" @mouseleave="isOpen = false" @click="isOpen = !isOpen">
      <a class="inline-block relative w-[30px] h-[42px] transition ease" href="#" @click="loadCartProducts">
        <i class="icon-bag2 text-3xl"></i>
        <span
          class="absolute bottom-2 -right-[5px] flex justify-center items-center w-[20px] h-[20px] text-white bg-dark-300 rounded-full">
          <i class="text-xs leading-4 font-medium not-italic">{{ total }}</i>
        </span>
      </a>
      <div v-if="isOpen && total > 0"
        class="absolute min-w-[300px] right-0 -left-[178px] z-30 pt-[10px] transition ease">
        <div
          class="min-h-[150px] relative p-5 max-h-[300px] overflow-auto bg-white border border-white border-b-transparent">
          <template v-if="isLoadingCart">
            <loading />
          </template>
          <template v-else-if="cartProducts?.length">
            <div v-for="(productItems, index) in cartProducts" :key="index">
              <div v-for="product in productItems.data.products.data" :key="product.id">
                <product-mini-cart :product="product" />
              </div>
            </div>
          </template>
        </div>
        <div class="p-[10px_20px_20px] border-t-0 bg-white">
          <h3 class="block mb-5 text-lg font-semibold flex justify-between">
            Sub total:
            <strong class="text-red-600 font-bold">${{ amount }}</strong>
          </h3>
          <figure class="flex flex-nowrap justify-between items-center">
            <div class="max-w-[50%] pr-1 flex basis-full">
              <nuxt-link to="/shopping-cart"
                class="w-full text-center p-[12px] font-semibold bg-yellow-400 text-white transition ease hover:bg-yellow-500">
                Ver carrito
              </nuxt-link>
            </div>
            <div class="basis-full max-w-[50%] pl-1">
              <nuxt-link to="/checkout"
                class="flex text-center justify-center p-[12px] font-semibold border border-yellow-400 transition ease text-yellow-500 hover:(bg-yellow-400 border-transparent text-white)">
                Checkout
              </nuxt-link>
            </div>
          </figure>
        </div>
      </div>
      <div v-else-if="isOpen" class="absolute min-w-[300px] right-0 -left-[178px] z-30 pt-[10px] transition ease">
        <div
          class="min-h-[50px] relative p-5 max-h-[300px] overflow-auto bg-white border border-white border-b-transparent">
          No hay productos en el carrito
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { GetProductById } from '~~/modules/product/queries';

const { $store } = useNuxtApp();
const graphql = useStrapiGraphQL();

const cartStore = $store.cart();
const productStore = $store.product();

const total = computed(() => cartStore.total);
const amount = computed(() => cartStore.amount);
const isLoadingCart = computed(() => cartStore.loading);
const cartItems = computed(() => cartStore.cartItems);
const cartProducts = computed(() => productStore.cartProducts);

const isOpen = ref(false);

const loadCartProducts = async () => {
  try {
    cartStore.loading = true;
    const itemsList = cartStore.cartItems.map((item) =>
      graphql<ProductsResponse>(GetProductById, { id: item.id })
    );

    if (!cartItems.value.length) {
      productStore.cartProducts = [];
      return;
    }

    // If doesnt exist in the local storage
    // then load from database
    if (!productStore.cartProducts?.length) {
      const response = await Promise.all(itemsList);
      productStore.cartProducts = response;
      return;
    }
  } catch (err) {
    console.log(err);
  } finally {
    cartStore.loading = false;
  }
}
</script>
