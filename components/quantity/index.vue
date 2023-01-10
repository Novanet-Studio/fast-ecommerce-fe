<template>
  <div class="quantity">
    <button class="quantity__btn" @click.prevent="handleIncreaseQuantity">
      <i class="fa fa-plus"></i>
    </button>
    <input class="quantity__input" v-model="quantity" type="text" disabled />
    <button class="quantity__btn" @click.prevent="handleDescreaseQuantity">
      <i class="fa fa-minus"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
};

const props = defineProps<Props>();
const { $store } = useNuxtApp();
const cart = $store.cart();

const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find((item) => item.id === props.product.id);

  if (!cartItem) return null;

  return cartItem.quantity;
});

const handleIncreaseQuantity = () => {
  cart.increaseCartItemQuantity(props.product);
};

const handleDescreaseQuantity = () => {
  cart.decreaseCartItemQuantity(props.product);
};
</script>
