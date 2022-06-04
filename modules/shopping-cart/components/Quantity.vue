<template>
  <div class="form-group--number">
    <button class="up" @click.prevent="handleIncreaseQuantity">
      <i class="fa fa-plus"></i>
    </button>
    <button class="down" @click.prevent="handleDescreaseQuantity">
      <i class="fa fa-minus"></i>
    </button>
    <input v-model="quantity" class="form-control" type="text" disabled />
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';

type Props = {
  product: any;
}

const props = defineProps<Props>();
const cart = useCart();

const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find(
    item => item.id === props.product.id
  );

  if (!cartItem) return null;

  return cartItem.quantity;
});

const handleIncreaseQuantity = () => {
  cart.increaseCartItemQuantity(props.product)
}

const handleDescreaseQuantity = () => {
  cart.decreaseCartItemQuantity(props.product);
}
</script>
