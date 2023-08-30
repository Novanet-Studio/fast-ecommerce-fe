<script lang="ts" setup>
import mapper from 'smapper';
import { injectKeys } from '~/config/constants';
import { GetProductById } from '~/graphql/queries';

type Emits = {
  (e: 'quickView', open: boolean): void;
};

defineEmits<Emits>();

const { $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();

const product = inject(injectKeys.product) as Product;

const cart = useCartStore();
const productStore = useProductStore();
const wishList = useWishlistStore();

const handleAddToCart = async () => {
  const temp: Product[] = [];
  const newProduct: CartItem = {
    id: product.id,
    quantity: 1,
    price: product.price,
  };

  cart.addProductToCart(newProduct);

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
    title: '¡Éxito!',
    text: `Producto ${newProduct.id} ha sido agregado al carrito!`,
  });
};

const handleAddItemToWishlist = () => {
  const item = {
    id: product.id,
  };

  wishList.addItem(item);

  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `Producto ${product.id} ha sido agregado a la lista de deseos!`,
  });
};
</script>

<template>
  <ul class="product-actions">
    <li class="product-actions__item">
      <button
        class="product-actions__link"
        title="Add to cart"
        @click.prevent="handleAddToCart"
      >
        <div class="i-ph-bag-light" />
      </button>
    </li>

    <li class="product-actions__item">
      <button
        class="product-actions__link"
        title="Quick View"
        @click.prevent="$emit('quickView', true)"
      >
        <div class="i-ph-eye-light" />
      </button>
    </li>
    <li class="product-actions__item">
      <button
        class="product-actions__link"
        title="Add to wishlist"
        @click.prevent="handleAddItemToWishlist"
      >
        <div class="i-ph-heart-light" />
      </button>
    </li>
  </ul>
</template>

<style scoped>
.product-actions {
  @apply absolute bottom-0 left-2/4 flex flex-nowrap justify-center items-center w-full py-[10px] bg-white transition duration-500 ease-in-out transform -translate-x-2/4 translate-y-100;
}

.product-actions__item {
  @apply mr-3;
}

.product-actions__link {
  @apply flex justify-center items-center w-9 h-9 rounded-full transition ease hover:(bg-color-1 text-white);
}
</style>
