<template >
  <div class="ps-product__info">
    <h1>{{ product.attributes.name }}</h1>
    <div class="ps-product__meta">
      <p>
        Tipo:
        <nuxt-link to="/shop">
          <a class="ml-2 text-capitalize">
            {{ product.attributes.category.data.attributes.name }}
          </a>
        </nuxt-link>
      </p>
      <div class="ps-product__rating">
        <rating />
        <span>(1 review)</span>
      </div>
    </div>
    <h4 v-if="product.attributes.is_sale === true" class="ps-product__price sale">
      <del class="mr-2"> $ {{ product.attributes.sale_price }}</del>
      ${{ product.attributes.price }}
    </h4>

    <h4 v-else class="ps-product__price">${{ product.attributes.price }}</h4>
    <module-product-detail-desc :product="product" />

    <div class="ps-product__shopping">
      <figure>
        <figcaption>Cantidad</figcaption>
        <div class="form-group--number">
          <button class="up" @click.prevent="handleIncreaseQuantity">
            <i class="fa fa-plus"></i>
          </button>
          <button class="down" @click.prevent="handleDescreaseQuantity">
            <i class="fa fa-minus"></i>
          </button>
          <input v-model="quantity" class="form-control" type="text" disabled />
        </div>
      </figure>
      <a class="ps-btn ps-btn--black" href="#" @click.prevent="handleAddToCart">
        Agregar al carrito
      </a>
      <a class="ps-btn" href="#" @click.prevent="handleBuyNow(true)">
        Comprar
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';

type Props = {
  product: any;
}

const { $notify } = useNuxtApp();
const router = useRouter();
const props = defineProps<Props>();
const cart = useCart();
const product = useProduct();

const quantity = ref(1);

const handleIncreaseQuantity = () => quantity.value += 1;
const handleDescreaseQuantity = () => quantity.value > 1 ? quantity.value-- : 0;

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const addItemToCart = async (payload) => {
  cart.addProductToCart(payload);
  await product.getCartProducts(cart.cartItems);
  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${props.product.attributes.name} ha sido agregado al carrito!`
  });
}

const handleAddToCart = () => {
  const productItem: unknown = {
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
}

const handleBuyNow = (isBuyNow: boolean) => {
  const existentItem = cart.cartItems.find((item) => item.id === props.product.id);

  const item = {
    id: props.product.id,
    quantity,
    price: props.product.attributes.price,
  };

  if (!existentItem) {
    addItemToCart(item);
    if (isBuyNow) {
      goToCheckout();
      return;
    }
  }

  const isGreaterThanTen = quantity.value + existentItem.quantity > 10

  // TODO: refactor this
  if (isGreaterThanTen) {
    $notify({
      group: 'all',
      title: 'Alerta!',
      text: `No puedes agregar mas de 10 items!`
    });
    return;
  }


  addItemToCart(item);
  goToCheckout();
}


// const getCartProducts = async (products: any[]) => {
//   const productsId = products.map((item) => item.id);
//   const response = await product.getCartProducts(productsId);

//   if (response)
//     cart.loading = false;
// }
</script>
