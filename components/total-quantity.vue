<template>
  <td class="total-quantity">${{ totalQuantity }}</td>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
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
  ((quantity.value as number) * props.product.price).toFixed(2)
);
</script>

<style scoped>
.total-quantity {
  @apply px-[10px] py-[20px] align-middle text-base w-[22.5rem] border-t-2 border-t-gray-200 md:text-center;
}
</style>
