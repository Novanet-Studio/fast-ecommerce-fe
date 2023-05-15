<template>
  <div class="info-quick-view">
    <h1 class="info-quick-view__title">
      {{ product?.name }}
    </h1>
    <div class="info-quick-view__meta">
      <p class="info-quick-view__text">
        Tipo:
        <nuxt-link to="/shop" class="info-quick-view__link">
          {{ product.category.name }}
        </nuxt-link>
      </p>
    </div>
    <h4 class="info-quick-view__price">${{ product.price }}</h4>

    <product-detail-description :product="product" />
    <div class="info-quick-view__divition"></div>

    <div class="info-quick-view__shopping">
      <figure class="info-quick-view__figure">
        <figcaption class="info-quick-view__figcaption">Cantidad</figcaption>
        <div class="info-quick-view__actions">
          <button
            class="info-quick-view__actions-btn"
            @click.prevent="handleDescreaseQuantity"
          >
            <ph-minus :size="12" class="text-gray-500" />
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
            <ph-plus :size="12" class="text-gray-500" />
          </button>
        </div>
      </figure>
      <a class="info-quick-view__btn" href="#" @click.prevent="handleAddToCart">
        Agregar al carrito
      </a>
      <a
        class="info-quick-view__btn-alt"
        href="#"
        @click.prevent="handleBuyNow(true)"
      >
        Comprar
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { PhPlus, PhMinus } from '@phosphor-icons/vue';
const { $store, $notify } = useNuxtApp();
const router = useRouter();
const props = defineProps<{ product: ProductsMapped }>();
const cart = $store.cart();
const { getCartProducts } = $store.product();

const quantity = ref(1);

const handleIncreaseQuantity = () => (quantity.value += 1);
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : 0;

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const addItemToCart = async (payload: CartItem) => {
  cart.addProductToCart(payload);
  await getCartProducts(cart.cartItems);
  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${props.product.name} ha sido agregado al carrito!`,
  });
};

const handleAddToCart = () => {
  const productItem = {
    id: props.product.id,
    quantity,
    price: props.product.price,
  };

  // @ts-ignore
  cart.addProductToCart(productItem);
  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `${props.product.name} ha sido agregado al carrito!`,
  });
};

const handleBuyNow = (isBuyNow: boolean) => {
  const existentItem = cart.cartItems.find(
    (item) => item.id === props.product.id
  );

  const item = {
    id: props.product.id,
    quantity: quantity.value,
    price: props.product.price,
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

// const getCartProducts = async (products: any[]) => {
//   const productsId = products.map((item) => item.id);
//   const response = await product.getCartProducts(productsId);

//   if (response)
//     cart.loading = false;
// }
</script>

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
  @apply text-yellow-500 ml-2 text-capitalize;
}

.info-quick-view__price {
  @apply mb-5 text-xl text-dark-800 font-semibold lg:text-2xl;
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
  @apply w-full font-bold p-4 rounded-sm flex items-center justify-center max-h-12 text-white bg-yellow-400 mx-7 mb-4 border rounded-md transition ease md:w-full lg:(text-sm mb-0) hover:bg-yellow-500;
}

.info-quick-view__btn-alt {
  @apply font-bold p-4 rounded-sm flex items-center justify-center max-h-12 w-full transition ease text-yellow-500 rounded-md border border-yellow-500 md:w-auto lg:(text-sm mr-7) hover:(text-white border-transparent bg-yellow-400);
}
</style>
