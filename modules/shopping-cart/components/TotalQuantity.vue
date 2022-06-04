<template>
  <td data-label="Total">
    ${{ totalQuantity }}
  </td>
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

const totalQuantity = computed(() => (quantity.value * props.product.attributes.price).toFixed(2));
</script>
