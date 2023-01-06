<template>
  <div class="max-w-[6.25rem] flex items-center justify-between border border-gray-300">
    <button class="p-2" @click.prevent="handleIncreaseQuantity">
      <i class="fa fa-plus"></i>
    </button>
    <input class="h-9 w-6 text-center" v-model="quantity" type="text" disabled />
    <button class="p-2" @click.prevent="handleDescreaseQuantity">
      <i class="fa fa-minus"></i>
    </button>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: Product;
}

const props = defineProps<Props>();
const { $store } = useNuxtApp();
const cart = $store.cart();

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
