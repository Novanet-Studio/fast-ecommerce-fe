<template>
  <div class="info-quick-view">
    <h1 class="info-quick-view__title">
      {{ product.attributes?.name }}
    </h1>
    <div class="info-quick-view__meta">
      <p class="info-quick-view__text">
        Tipo:
        <nuxt-link to="/shop" class="info-quick-view__link">
          {{ product.attributes.category.data.attributes.name }}
        </nuxt-link>
      </p>
    </div>
    <h4 class="info-quick-view__price">${{ product.attributes.price }}</h4>

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
            <i class="fa fa-minus text-gray-500"></i>
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
            <i class="fa fa-plus text-gray-500"></i>
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
const { $store, $notify } = useNuxtApp();
const router = useRouter();
const props = defineProps<{ product: Product }>();
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
    text: `${props.product.attributes.name} ha sido agregado al carrito!`,
  });
};

const handleAddToCart = () => {
  const productItem = {
    id: props.product.id,
    quantity,
    price: props.product.attributes.price,
  };

  // @ts-ignore
  cart.addProductToCart(productItem);
  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `${props.product.attributes.name} ha sido agregado al carrito!`,
  });
};

const handleBuyNow = (isBuyNow: boolean) => {
  const existentItem = cart.cartItems.find(
    (item) => item.id === props.product.id
  );

  const item = {
    id: props.product.id,
    quantity: quantity.value,
    price: props.product.attributes.price,
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
