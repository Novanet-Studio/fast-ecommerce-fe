<template>
  <div class="ps-product--cart-mobile">
    <div class="ps-product__thumbnail">
      <product-thumbnail-image :product="product" />
    </div>
    <div class="ps-product__content">
      <a class="ps-product__remove" href="#" @click.prevent="handleRemoveProductFromCart(product)">
        <i class="icon-cross"></i>
      </a>
      <product-title :product="product" />
      <small v-if="quantity !== null">
        {{ quantity }} x {{ currency }} {{ product.attributes.price }}
      </small>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';
import { useApp } from '~/store/app';

const cartStore = useCart();
const productStore = useProduct();
const appStore = useApp();

// TODO: refactor
type Props = {
  product: {
    attributes: {
      price: number;
    }
  }
}

defineProps<Props>();

const total = computed(() => cartStore.total);
const cartItems = computed(() => cartStore.cartItems);
const cartProducts = computed(() => productStore.cartProducts);
const currency = computed(() => appStore.currency);
const quantity = computed(() => {
  if (!cartItems.value.length) {
    return null;
  }

  // const cartItem = this.cartItems.find(
  //   item => item.id === this.product.id
  // );
  const cartItem = cartItems.value.find((item) => item.id === cartProducts.value.id);

  if (!cartItem) {
    return null;
  }

  return cartItem.quantity;
});

const loadCartProducts = async () => {
  if (!cartItems.value.length) productStore.cartProducts = [];

  const queries = [];
  cartStore.cartItems.forEach((item) => queries.push(item));

  const response = await productStore.getCartProducts(queries);
  if (response) cartStore.loading = false;
}

const handleRemoveProductFromCart = (product: any) => {
  const cartItem = cartItems.value.find((item) => item.id === product.id);
  cartStore.removeProductFromCart(cartItem);
  cartStore.loading = true;
  loadCartProducts();
}
</script>
