<template>
  <div>
    {{ quantity }} x ${{ product.attributes.price }}
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';

type Props = {
  product: any;
}

const props = defineProps<Props>();
const cart = useCart();

// TODO: Quantity refactor, move to one store as method
const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find(
    item => item.id === props.product.id
  );

  if (!cartItem) return null;

  return cartItem.quantity;
});
</script>
