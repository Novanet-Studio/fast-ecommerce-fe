<template >
  <!-- ps-product__info -->
  <div class="max-w-full lg:(max-w-[57%] pl-8)">
    <h1 class="mb-[10px] text-xl lg:text-2xl">{{ product.attributes?.name }}</h1>
    <!-- ps-product__meta -->
    <div class="flex flex-nowrap items-center mb-5 pb-[6px] border-b-2 border-b-gray-200 text-sm lg:text-base">
      <p class="relative inline-block mb-0 mr-[10px] pr-[10px] leading-5">
        Tipo:
        <nuxt-link to="/shop" class="text-yellow-500">
          <a class="ml-2 text-capitalize">
            {{ product.attributes.category.data.attributes.name }}
          </a>
        </nuxt-link>
      </p>
    </div>
    <!-- <h4 class="" v-if="product.attributes?.is_sale">
      <del class="mr-2"> $ {{ product.attributes?.sale_price }}</del>
      ${{ product.attributes.price }}
    </h4> -->

    <!-- ps-product__price -->
    <h4 class="mb-5 text-xl text-dark-800 font-semibold lg:text-2xl">${{ product.attributes.price }}</h4>

    <product-detail-description :product="product" />
    <div class="mt-2 mb-4 border-b-2 border-b-gray-200"></div>

    <!-- ps-product__shopping -->
    <div class="flex flex-col items-center mb-12 pb-8 border-b-2 border-b-gray-200 lg:(items-end flex-row flex-nowrap)">
      <figure class="mb-4 lg:mb-0">
        <figcaption class="mb-1 text-center lg:text-right">Cantidad</figcaption>
        <div class="flex border border-gray-400 p-2 w-full md:max-w-[7.1875rem]">
          <button class="block w-14 h-5 max-w-14 lg:(w-5 h-5 max-w-5)" @click.prevent="handleDescreaseQuantity">
            <i class="fa fa-minus text-gray-500"></i>
          </button>
          <input class="w-14 text-center text-red-500 lg:w-[40px]" v-model="quantity" type="text" disabled />
          <button class="block w-14 h-5 max-w-12 lg:(w-5 h-5 max-w-5)" @click.prevent="handleIncreaseQuantity">
            <i class="fa fa-plus text-gray-500"></i>
          </button>
        </div>
      </figure>
      <a class="w-full font-bold p-4 rounded-sm flex items-center justify-center max-h-12 text-white bg-yellow-400 mx-7 mb-4 border transition ease ,d:w-full lg:(text-lg mb-0) hover:bg-yellow-500"
        href="#" @click.prevent="handleAddToCart">
        Agregar al carrito
      </a>
      <a class="font-bold p-4 rounded-sm flex items-center justify-center max-h-12 w-full transition ease text-yellow-500 border border-yellow-500 md:w-auto lg:(text-lg mr-7) hover:(text-white border-transparent bg-yellow-400)"
        href="#" @click.prevent="handleBuyNow(true)">
        Comprar
      </a>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $store, $notify } = useNuxtApp();
const router = useRouter();
const props = defineProps<{ product: Product; }>();
const cart = $store.cart();
const { getCartProducts } = $store.product();

const quantity = ref(1);

const handleIncreaseQuantity = () => quantity.value += 1;
const handleDescreaseQuantity = () => quantity.value > 1 ? quantity.value-- : 0;

const goToCheckout = () => setTimeout(() => router.push('/checkout'), 500);

const addItemToCart = async (payload) => {
  cart.addProductToCart(payload);
  await getCartProducts(cart.cartItems);
  $notify({
    group: 'all',
    title: 'Exito!',
    text: `${props.product.attributes.name} ha sido agregado al carrito!`
  });
}

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
