<template>
  <div class="navigation--list">
    <div class="navigation__content">
      <a class="navigation__item" href="#" @click.prevent="handleOpenDrawer('menu')">
        <i class="icon-menu"></i>
        <span> Menu</span>
      </a>
      <a class="navigation__item" @click.prevent="handleOpenDrawer('categories')">
        <i class="icon-list4"></i>
        <span> Categorias</span>
      </a>

      <!-- <a class="navigation__item" @click.prevent="handleOpenDrawer('search')">
        <i class="icon-magnifier"></i>
        <span> Search</span>
      </a> -->

      <a class="navigation__item" @click.prevent="handleOpenDrawer('cart')">
        <i class="icon-bag2"></i>
        <span> Cart</span>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '~/store/app';
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';

const app = useApp();
const cart = useCart();
const product = useProduct();

const loadCartProducts = async () => {
  if (cart.cartItems.length > 0) {
    const queries = [];
    cart.cartItems.forEach(item => queries.push(item.id));
    if (queries.length > 0) product.getCartProducts(queries);
  }
}

const handleOpenDrawer = (drawer: 'cart' | 'menu' | 'categories') => {
  if (drawer === 'cart') {
    loadCartProducts();
  }

  app.currentDrawerContent = drawer;
  app.appDrawer = !app.appDrawer;
}
</script>
