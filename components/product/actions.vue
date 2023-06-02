<template>
  <ul class="product-actions">
    <li class="product-actions__item">
      <button
        class="product-actions__link"
        title="Add to cart"
        @click.prevent="handleAddToCart"
      >
        <ph-bag weight="light" />
      </button>
    </li>

    <li class="product-actions__item">
      <button
        class="product-actions__link"
        title="Quick View"
        @click.prevent="$emit('quickView', true)"
      >
        <ph-eye weight="light" />
      </button>
    </li>
    <li class="product-actions__item">
      <button
        class="product-actions__link"
        title="Add to wishlist"
        @click.prevent="handleAddItemToWishlist"
      >
        <ph-heart weight="light" />
      </button>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { PhBag, PhEye, PhHeart } from '@phosphor-icons/vue';
import { GetProductById } from '~/graphql/queries';

type Props = {
  id: string;
  price: number;
};

type Emits = {
  (e: 'quickView', open: boolean): void;
};

const { $notify } = useNuxtApp();
const props = defineProps<Props>();
const emit = defineEmits<Emits>();
const graphql = useStrapiGraphQL();

const cart = useCartStore();
const product = useProductStore();
const wishList = useWishlistStore();

const handleAddToCart = async () => {
  const temp: Product[] = [];
  const newProduct: CartItem = {
    id: props.id,
    quantity: 1,
    price: props.price,
  };

  cart.addProductToCart(newProduct);

  const itemsList = cart.cartItems.map((item) =>
    graphql<ProductRequest>(GetProductById, { id: item.id })
  );

  const itemsResult = await Promise.all(itemsList);

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
    id: props.id,
  };

  wishList.addItem(item);

  $notify({
    group: 'all',
    title: '¡Éxito!',
    text: `Producto ${props.id} ha sido agregado a la lista de deseos!`,
  });
};
</script>

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
