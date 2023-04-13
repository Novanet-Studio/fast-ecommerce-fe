<template>
  <div class="relative">
    <div @mouseover="isOpen = true" @mouseleave="isOpen = false">
      <a class="header-actions__link" href="#" @click="loadCartProducts">
        <!-- <i class="header-actions__icon icon-bag2"></i> -->
        <ph-bag class="header-actions__icon" weight="light" />
        <span class="header-actions__indicator-wrapper">
          <i class="header-actions__indicator">{{ total }}</i>
        </span>
      </a>
      <!-- Menu -->
      <div v-if="isOpen && total > 0" class="mini-cart">
        <div class="mini-cart__body">
          <template v-if="isLoadingCart">
            <loading />
          </template>
          <template v-else-if="cartProducts?.length">
            <div v-for="(product, index) in cartProducts" :key="index">
              <product-mini-cart :product="product" />
            </div>
          </template>
        </div>
        <div class="mini-cart__footer">
          <h3 class="mini-cart__footer-title">
            Sub total:
            <strong class="mini-cart__amount">${{ amount }}</strong>
          </h3>
          <figure class="mini-cart__wrapper">
            <div class="mini-cart__left">
              <nuxt-link to="/shopping-cart" class="btn">
                Ver carrito
              </nuxt-link>
            </div>
            <div class="mini-cart__right">
              <nuxt-link to="/checkout" class="btn btn--outline">
                Checkout
              </nuxt-link>
            </div>
          </figure>
        </div>
      </div>
      <div v-else-if="isOpen" class="mini-cart">
        <div class="mini-cart__empty">No hay productos en el carrito</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhBag } from '@phosphor-icons/vue';
import { getProductById as GetProductById } from '~/graphql';

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
      const [response] = await Promise.all(itemsList);
      productStore.cartProducts = mapperData(response.data.products.data);
      return;
    }
  } catch (err) {
    console.log(err);
  } finally {
    cartStore.loading = false;
  }
};

// onMounted(() => loadCartProducts());
</script>
