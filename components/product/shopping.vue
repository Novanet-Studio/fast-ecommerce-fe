<template>
  <div class="ps-product__shopping">
    <figure>
      <figcaption>Cantidad</figcaption>
      <div class="form-group--number">
        <button class="up" @click.prevent="handleIncreaseQuantity">
          <i class="fa fa-plus">+</i>
        </button>
        <button class="down" @click.prevent="handleDescreaseQuantity">
          <i class="fa fa-minus">-</i>
        </button>
        <input v-model="quantity" class="form-control" type="text" disabled />
      </div>
    </figure>
    <a
      class="ps-btn ps-btn--black"
      href="#"
      @click.prevent="handleAddToCart(false)"
    >
      Agregar al carrito
    </a>
    <a class="ps-btn" href="#" @click.prevent="handleAddToCart(true)">
      Comprar
    </a>
    <div class="ps-product__actions">
      <a
        href="#"
        title="Add to wishlist"
        @click.prevent="handleAddItemToWishlist()"
      >
        <i class="icon-heart"></i>
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Props = {
  product: ProductsMapped;
};

const { $notify, $store } = useNuxtApp();
const cart = $store.cart();
const product = $store.product();
const wishlist = $store.wishlist();
const router = useRouter();
const props = defineProps<Props>();
const quantity = ref<number>(1);

const handleIncreaseQuantity = () => quantity.value++;
const handleDescreaseQuantity = () =>
  quantity.value > 1 ? quantity.value-- : quantity;

// TODO: add typings
const addItemToCart = async (payload: any) => {
  cart.addProductToCart(payload);

  if (!cart.cartItems.length) return;

  const itemsId = cart.cartItems.map((item) => item.id);

  await product.getCartProducts(itemsId);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${props.product.name} ha sido agregado al carrito!`,
  });
};

// const getCartProduct = async (products: any[]) => {
//   const itemsId = products.map((item) => item.id);
//   await product.getCartProducts(itemsId);
// }

// const loadCartProducts = async () => {
//   if (!cart.cartItems.length) {
//     product.cartProducts = null;
//     return;
//   }

//   const itemsId = cart.cartItems.map((item) => item.id);
//   await product.getCartProducts(itemsId);
// }

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const handleAddItemToWishlist = () => {
  const item = {
    id: props.product.id,
  };

  wishlist.addItemToWishlist(item);

  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${props.product.name} ha sido agregado a la lista de deseos!`,
  });
};

const handleAddToCart = (isBuyNow = false) => {
  const existItem = cart.cartItems.find((item) => item.id === props.product.id);
  const item = {
    id: props.product.id,
    quantity: quantity.value,
    price: props.product.price,
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
