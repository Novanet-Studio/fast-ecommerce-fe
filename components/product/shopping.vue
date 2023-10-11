<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

const { $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();

const cart = useCartStore();
const productStore = useProductStore();
const wishlist = useWishlistStore();
const router = useRouter();
const quantity = ref<number>(1);

const product = inject(injectKeys.productDetail) as Ref<Product>;

const handleIncreaseQuantity = () => quantity.value++;
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : quantity;

const addItemToCart = async (payload: CartItem) => {
  const temp: Product[] = [];

  cart.addProductToCart(payload);

  if (!cart.cartItems.length) return;

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  mapper<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  productStore.addCartProducts(temp);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.value.name} ha sido agregado al carrito!`,
  });
};

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: product.value.id,
  };

  wishlist.addItem(item);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${product.value.name} ha sido agregado a la lista de deseos!`,
  });
};

const handleAddToCart = (isBuyNow = false) => {
  const existItem = cart.cartItems.find((item) => item.id === product.value.id);
  const item = {
    id: product.value.id,
    quantity: quantity.value,
    price: product.value.price,
  };

  if (!existItem) {
    addItemToCart(item);
    if (isBuyNow) goToCheckout();
    return;
  }

  const isQuantityGreaterThanTen = quantity.value + existItem.quantity > 10;

  if (!isQuantityGreaterThanTen) {
    addItemToCart(item);
    if (isBuyNow) goToCheckout();
    return;
  }

  $notify({
    group: 'all',
    title: 'Advertencia!',
    text: `No puede añadir más de 10 elementos`,
  });
};
</script>

<template>
  <div class="shopping">
    <figure class="shopping__figure">
      <figcaption class="shopping__figcaption">Cantidad</figcaption>
      <div class="shopping__actions">
        <button
          class="shopping__actions-btn"
          @click.prevent="handleIncreaseQuantity"
        >
          <div class="i-ph-minus-light text-xs text-gray-5" />
        </button>
        <input
          v-model="quantity"
          class="shopping__actions-input"
          type="text"
          disabled
        />
        <button
          class="shopping__actions-btn"
          @click.prevent="handleDescreaseQuantity"
        >
          <div class="i-ph-plus-light text-xs text-gray-5" />
        </button>
      </div>
    </figure>
    <button class="shopping__btn" @click.prevent="handleAddToCart(false)">
      Agregar al carrito
    </button>
    <button class="shopping__btn-alt" @click.prevent="handleAddToCart(true)">
      Comprar
    </button>
    <button
      class="shopping__btn-alt !bg-transparent"
      title="Add to wishlist"
      @click.prevent="handleAddItemToWishlist()"
    >
      <div class="i-ph-heart-light text-[24px] text-color-2" />
    </button>
  </div>
</template>

<style scoped>
.shopping {
  @apply flex flex-col items-center mb-12 pb-8 border-b-2 border-b-gray-200 lg:(items-end justify-start flex-row);
}

.shopping__figure {
  @apply mb-4 lg:mb-0;
}

.shopping__figcaption {
  @apply mb-1 text-center;
}

.shopping__actions {
  @apply flex border border-gray-400 rounded-md p-2 w-full md:max-w-[7.1875rem];
}

.shopping__actions-btn {
  @apply flex items-center justify-center pt-1 w-14 h-5 max-w-14 lg:(w-5 h-5 max-w-5);
}

.shopping__actions-input {
  @apply w-14 text-center text-red-500 lg:w-[40px];
}

.shopping__btn {
  @apply w-full font-bold p-4 rounded-sm flex items-center justify-center max-h-12 text-white bg-color-2 mx-7 mb-4 border rounded-md transition ease md:w-full lg:(text-xs mb-0 max-w-50);
}

.shopping__btn-alt {
  @apply font-bold p-4 rounded-sm flex items-center justify-center max-h-12 w-full transition ease text-color-2 rounded-md bg-color-1 md:w-auto lg:(text-xs mr-7) hover:(text-white border-transparent bg-color-2);
}
</style>
