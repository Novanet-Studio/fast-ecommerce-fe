<template>
  <section class="ps-page--my-account">
    <bread-crumb :breadcrumb="breadCrumb" />
    <shopping-cart />
    <!-- 📝: Why this notification template? -->
    <notifications group="all" :duration="2000" :width="300" animation-name="fade-left" position="top right">
      <template #body="props">
        <div class="ps-notify" :class="props.className">
          <button class="ps-notify__close" @click="props.close">
            <i class="icon icon-cross"></i>
          </button>
          <div class="ps-notify__header">
            <span>{{ props.item.title }}</span>
          </div>
          <div class="ps-notify__content">
            <p>{{ props.item.text }}</p>
          </div>
        </div>
      </template>
    </notifications>
  </section>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';

definePageMeta({
  layout: 'layout-account',
  // TODO: Search documentation for transition in Nuxt3
  // transition: 'zoom',
});

const cart = useCart();
const product = useProduct();

const breadCrumb = ref([
  {
    text: 'Inicio',
    url: '/'
  },
  {
    text: 'Carrito de compra'
  }
]);

// TODO: Move this function to store file
const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (itemsId.length) {
    await product.getCartProducts(itemsId);
  }
}

onMounted(async () => {
  await loadCartProducts();
});

</script>
