<template >
  <ul
    class="absolute bottom-0 left-2/4 flex flex-nowrap justify-center items-center w-full py-[10px] bg-white transition duration-500 ease-[cubic-bezier(0.7,0.3,1)] transform -translate-x-2/4 translate-y-100">
    <li class="mr-3">
      <a class="flex justify-center  items-center w-9 h-9 rounded-full transition ease hover:(bg-yellow-500 text-white)"
        href="#" title="Add to cart" @click.prevent="handleAddToCart">
        <i class="icon-bag2"></i>
      </a>
    </li>

    <li class="mr-3">
      <a class="flex justify-center items-center w-9 h-9 rounded-full transition ease hover:(bg-yellow-500 text-white)"
        href="#" title="Quick View" @click.prevent="handleOpenQuickView">
        <i class="icon-eye"></i>
      </a>
    </li>
    <li class="mr-3">
      <a class="flex justify-center items-center w-9 h-9 rounded-full transition ease hover:(bg-yellow-500 text-white)"
        href="#" title="Add to wishlist" @click.prevent="handleAddItemToWishlist">
        <i class="icon-heart"></i>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { GetProductById } from '../queries';

type Props = {
  product: Product;
}

type Emits = {
  (e: 'quickView', open: boolean): void;
}

const { $notify, $store } = useNuxtApp();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const graphql = useStrapiGraphQL();
const cart = $store.cart();
const product = $store.product();
const wishList = $store.wishlist();

const handleAddToCart = async () => {
  const newProduct: Partial<Product> & Record<string, unknown> = {
    id: props.product.id,
    quantity: 1,
    price: props.product.attributes.price,
  }

  cart.addProductToCart(newProduct as any);
  const itemsList = cart.cartItems.map((item) => graphql<ProductsResponse>(GetProductById, { id: item.id }));

  const itemsResult = await Promise.all(itemsList);
  product.cartProducts = itemsResult;

  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `Producto ${newProduct.id} ha sido agregado al carrito!`,
  });
}

const handleAddItemToWishlist = () => {
  const item = {
    id: props.product.id,
  };

  wishList.addItemToWishlist(item);
  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `Producto ${props.product.id} ha sido agregado a la lista de deseos!`,
  });
}

// handleOpenQuickviewDialog
const handleOpenQuickView = () => {
  emit('quickView', true);
}
</script>
