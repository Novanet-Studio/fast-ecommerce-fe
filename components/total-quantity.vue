<template>
  <td class="total-quantity">${{ totalQuantity }}</td>
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

const totalQuantity = computed(() =>
  (quantity.value * props.product.attributes.price).toFixed(2)
);
</script>
