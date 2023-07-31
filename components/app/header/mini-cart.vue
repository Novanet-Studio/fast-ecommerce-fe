<template>
  <div class="relative">
    <div
      class="cursor-pointer"
      @mouseover="isOpen = true"
      @mouseleave="isOpen = false"
      @click.prevent="isOpen = !isOpen"
    >
      <div class="header-actions__link">
        <span class="i-ph-bag-light header-actions__icon"></span>
        <span class="header-actions__indicator-wrapper">
          <i class="header-actions__indicator">{{ total }}</i>
        </span>
      </div>
      <!-- Menu -->
      <transition name="slide-fade">
        <template v-if="isOpen">
          <div v-if="total > 0" class="mini-cart">
            <div class="mini-cart__body">
              <template v-if="isLoadingCart">
                <app-loader />
              </template>
              <template v-else-if="cartProducts?.length">
                <div v-for="(product, index) in cartProducts" :key="index">
                  <product-mini-cart :product="product!" />
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
                    Pagar
                  </nuxt-link>
                </div>
              </figure>
            </div>
          </div>
          <div v-else class="mini-cart">
            <div class="mini-cart__empty">No hay productos en el carrito</div>
          </div>
        </template>
      </transition>
    </div>
  </div>
</template>

<script lang="ts" setup>
const cartStore = useCartStore();
const productStore = useProductStore();

const isLoadingCart = ref(false);
const total = computed(() => cartStore.total);
const amount = computed(() => cartStore.amount);
const cartProducts = computed(() => productStore.cartProducts);

const isOpen = ref(false);
</script>

<style scoped>
.mini-cart {
  @apply absolute min-w-[300px] right-0 -left-[178px] z-30 pt-[10px] transition ease;
}

.mini-cart__body {
  @apply min-h-[150px] relative p-5 max-h-[300px] overflow-auto bg-white border border-white border-b-transparent;
}

.mini-cart__footer {
  @apply p-[10px_20px_20px] border-t-0 bg-white;
}
.mini-cart__footer-title {
  @apply block mb-5 text-lg font-semibold flex justify-between;
}

.mini-cart__amount {
  @apply text-red-600 font-bold;
}

.mini-cart__empty {
  @apply min-h-[50px] relative p-5 max-h-[300px] overflow-auto bg-white border border-white border-b-transparent;
}

.mini-cart__wrapper {
  @apply flex flex-nowrap justify-between items-center;
}

.mini-cart__left {
  @apply max-w-[50%] pr-1 flex basis-full;
}

.mini-cart__right {
  @apply max-w-[50%] pl-1 basis-full;
}
</style>
