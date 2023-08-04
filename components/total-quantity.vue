<script lang="ts" setup>
type Props = {
  id: string;
  price: number;
};

const props = defineProps<Props>();
const cart = useCartStore();

const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find((item) => item.id === props.id);

  if (!cartItem) return null;

  return cartItem.quantity;
});

const totalQuantity = computed(() =>
  ((quantity.value as number) * props.price).toFixed(2)
);
</script>

<template>
  <td class="total-quantity">${{ totalQuantity }}</td>
</template>
