<template >
  <ul class="ps-product__actions">
    <li>
      <a to="#" data-toggle="tooltip" data-placement="top" title="Add to cart" @click.prevent="handleAddToCart">
        <i class="icon-bag2"></i>
      </a>
    </li>

    <li>
      <a to="#" data-toggle="tooltip" data-placement="top" title="Quick View" @click.prevent="handleOpenQuickView">
        <i class="icon-eye"></i>
      </a>
    </li>
    <li>
      <a href="#" data-toggle="tooltip" data-placement="top" title="Add to wishlist"
        @click.prevent="handleAddItemToWishlist">
        <i class="icon-heart"></i>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';
import { useWishList } from '~/store/wishlist';

type Product = {
  id: string;
  quantity: number;
  price: number;
}

type Props = {
  product: Product;
}

type Emits = {
  (e: 'quickView', open: boolean): void;
}

const { $notify } = useNuxtApp();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const cart = useCart();
const product = useProduct();
const wishList = useWishList();

const handleAddToCart = async () => {
  const newProduct: Product = {
    id: props.product.id,
    quantity: 1,
    price: props.product.price,
  }

  cart.addProductToCart(newProduct);
  const cartItemsId = cart.cartItems.map((item) => item.id);
  await product.getCartProducts(cartItemsId);

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
