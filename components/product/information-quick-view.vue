<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const product = inject(injectKeys.product) as Product;

const { $notify } = useNuxtApp();
const router = useRouter();
const cart = useCartStore();
const quantity = ref(1);

const handleIncreaseQuantity = () => (quantity.value += 1);
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : 0;

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const addItemToCart = async (payload: CartItem) => {
  cart.addProductToCart(payload);
  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.name} ha sido agregado al carrito!`,
  });
};

const handleAddToCart = () => {
  const productItem = {
    id: product.id,
    quantity,
    price: product.price,
  };

  // @ts-ignore
  cart.addProductToCart(productItem);
  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `${product.name} ha sido agregado al carrito!`,
  });
};

const handleBuyNow = (isBuyNow: boolean) => {
  const existentItem = cart.cartItems.find((item) => item.id === product.id);

  const item = {
    id: product.id,
    quantity: quantity.value,
    price: product.price,
  };

  if (!existentItem) {
    addItemToCart(item);
    if (isBuyNow) {
      goToCheckout();
      return;
    }
  }

  const isGreaterThanTen = quantity.value + existentItem!.quantity > 10;

  if (isGreaterThanTen) {
    $notify({
      group: 'all',
      title: 'Alerta!',
      text: `No puedes agregar mas de 10 items!`,
    });
    return;
  }

  addItemToCart(item);
  goToCheckout();
};
</script>

<template>
  <div class="info-quick-view">
    <h1 class="info-quick-view__title">
      {{ product?.name }}
    </h1>
    <div class="info-quick-view__meta">
      <p class="info-quick-view__text">
        Tipo:
        <span class="info-quick-view__link">
          {{ product.category.name }}
        </span>
      </p>
    </div>
    <h4 class="info-quick-view__price">${{ product.price }}</h4>

    <product-detail-description :description="product.description" />

    <div class="info-quick-view__shopping">
      <figure class="info-quick-view__figure">
        <figcaption class="info-quick-view__figcaption">Cantidad</figcaption>
        <div class="info-quick-view__actions">
          <button
            class="info-quick-view__actions-btn"
            @click.prevent="handleDescreaseQuantity"
          >
            <div class="i-ph-minus-light text-xs text-gray-500" />
          </button>
          <input
            class="info-quick-view__actions-input"
            v-model="quantity"
            type="text"
            disabled
          />
          <button
            class="info-quick-view__actions-btn"
            @click.prevent="handleIncreaseQuantity"
          >
            <div class="i-ph-plus-light text-xs text-gray-500" />
          </button>
        </div>
      </figure>
      <button class="info-quick-view__btn" @click.prevent="handleAddToCart">
        Agregar al carrito
      </button>
      <button
        class="info-quick-view__btn-alt"
        @click.prevent="handleBuyNow(true)"
      >
        Comprar
      </button>
    </div>
  </div>
</template>

<style scoped>
.info-quick-view {
  @apply max-w-full lg:(max-w-[57%] pl-8);
}

.info-quick-view__title {
  @apply mb-[10px] text-xl lg:text-2xl;
}

.info-quick-view__meta {
  @apply flex flex-nowrap items-center mb-5 pb-[6px] border-b-2 border-b-gray-200 text-sm lg:text-base;
}

.info-quick-view__text {
  @apply relative inline-block mb-0 mr-[10px] pr-[10px] leading-5;
}

.info-quick-view__link {
  @apply text-color-6 ml-2 text-capitalize;
}

.info-quick-view__price {
  @apply mb-5 text-xl text-color-2 font-semibold lg:text-2xl;
}

.info-quick-view__divition {
  @apply mt-2 mb-4 border-b-2 border-b-gray-200;
}

.info-quick-view__shopping {
  @apply flex flex-col items-center mb-12 pb-8 border-b-2 border-b-gray-200 lg:(items-end flex-row flex-nowrap);
}

.info-quick-view__figure {
  @apply mb-4 lg:mb-0;
}

.info-quick-view__figcaption {
  @apply mb-1 text-center;
}

.info-quick-view__actions {
  @apply flex border border-gray-400 rounded-md p-2 w-full md:max-w-[7.1875rem];
}

.info-quick-view__actions-btn {
  @apply flex items-center justify-center pt-1 w-14 h-5 max-w-14 lg:(w-5 h-5 max-w-5);
}

.info-quick-view__actions-input {
  @apply w-14 text-center text-red-500 lg:w-[40px];
}

.info-quick-view__btn {
  @apply w-full font-bold p-4 rounded-sm flex items-center justify-center max-h-12 text-white bg-color-2 mx-7 mb-4 border rounded-md transition ease md:w-full lg:(text-xs mb-0) hover:bg-yellow-500;
}

.info-quick-view__btn-alt {
  @apply font-bold p-4 rounded-sm flex items-center justify-center max-h-12 w-full transition ease text-color-2 rounded-md bg-color-1 md:w-auto lg:(text-xs mr-7) hover:(text-white border-transparent bg-color-2);
}
</style>
