<template>
  <div class="quantity">
    <button class="quantity__btn" @click.prevent="handleIncreaseQuantity">
      <ph-plus weight="light" />
    </button>
    <input class="quantity__input" v-model="quantity" type="text" disabled />
    <button class="quantity__btn" @click.prevent="handleDescreaseQuantity">
      <ph-minus weight="light" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import { PhPlus, PhMinus } from '@phosphor-icons/vue';

type Props = {
  id: string;
};

const props = defineProps<Props>();
const cart = useCartStore();
const payload = {
  id: props.id,
} as CartItem;

const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find((item) => item.id === props.id);

  if (!cartItem) return null;

  return cartItem.quantity;
});

const handleIncreaseQuantity = () => {
  cart.increaseCartItemQuantity(payload);
};

const handleDescreaseQuantity = () => {
  cart.decreaseCartItemQuantity(payload);
};
</script>

<style scoped>
.quantity {
  @apply max-w-[6.25rem] flex items-center justify-between border border-gray-300;
}

.quantity__btn {
  @apply p-2;
}

.quantity__input {
  @apply h-9 w-6 text-center;
}
</style>
