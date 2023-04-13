<template>
  <ul class="product-actions">
    <li class="product-actions__item">
      <a
        class="product-actions__link"
        href="#"
        title="Add to cart"
        @click.prevent="handleAddToCart"
      >
        <ph-bag weight="light" />
      </a>
    </li>

    <li class="product-actions__item">
      <a
        class="product-actions__link"
        href="#"
        title="Quick View"
        @click.prevent="handleOpenQuickView"
      >
        <ph-eye weight="light" />
      </a>
    </li>
    <li class="product-actions__item">
      <a
        class="product-actions__link"
        href="#"
        title="Add to wishlist"
        @click.prevent="handleAddItemToWishlist"
      >
        <ph-heart weight="light" />
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PhBag, PhEye, PhHeart } from '@phosphor-icons/vue';
import { getProductById } from '~/graphql';

type Props = {
  product: ProductsMapped;
};

type Emits = {
  (e: 'quickView', open: boolean): void;
};

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
    price: props.product.price,
  };

  cart.addProductToCart(newProduct as any);
  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductsResponse>(getProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

  const temp: any[] = [];

  mapperData<any[]>(itemsResult).forEach((item) => {
    temp.push(item.products[0]);
  });

  product.addCartProducts(temp);

  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `Producto ${newProduct.id} ha sido agregado al carrito!`,
  });
};

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
};

// handleOpenQuickviewDialog
const handleOpenQuickView = () => {
  emit('quickView', true);
};
</script>
