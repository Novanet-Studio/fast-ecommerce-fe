<template>
  <div class="ps-cart--mini">
    <div>
      <a class="header__extra" href="#" @click="loadCartProducts">
        <i class="icon-bag2"></i>
        <span>
          <i>{{ total }}</i>
        </span>
      </a>
      <div v-if="total > 0" class="ps-cart__content">
        <div class="ps-cart__items">
          <template v-if="isLoadingCart">
            <loading />
          </template>
          <template v-else-if="cartProducts?.length">
            <product-mini-cart v-for="product in cartProducts.data" :key="product.id" :product="product" />
          </template>
        </div>
        <div class="ps-cart__footer">
          <h3>
            Sub total:
            <strong>${{ amount }}</strong>
          </h3>
          <figure>
            <div>
              <nuxt-link to="/shopping-cart" class="ps-btn">
                Ver carrito
              </nuxt-link>
            </div>
            <div>
              <nuxt-link to="/checkout" class="ps-btn">
                Checkout
              </nuxt-link>
            </div>
          </figure>
        </div>
      </div>
      <div v-else class="ps-cart__content">
        <div class="ps-cart__items no-products">
          No hay productos en el carrito
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';

const cartStore = useCart();
const productStore = useProduct();

const total = computed(() => cartStore.total);
const amount = computed(() => cartStore.amount);
const isLoadingCart = computed(() => cartStore.loading);
const cartItems = computed(() => cartStore.cartItems);
const cartProducts = computed(() => productStore.cartProducts);

const loadCartProducts = async () => {
  const queries = [];
  cartStore.cartItems.forEach((item) => queries.push(item));

  if (cartItems.value.length > 0) {
    const response = await productStore.getCartProducts(queries);

    if (response.length) {
      cartStore.loading = false;
    }
  } else {
    productStore.cartProducts = [];
  }
}
</script>

<style lang="scss" scoped>
.ps-cart__items {
  min-height: 150px;

  &.no-products {
    min-height: 50px;
  }
}

.ps-cart__footer {
  figure {
    display: flex;
    flex-flow: row nowrap;
    margin-right: 0 -5px;

    >* {
      flex-basis: 100%;
      max-width: 50%;
      padding: 0 5px;
    }

    .ps-btn {
      width: 100%;
      text-align: center;
    }
  }
}
</style>
