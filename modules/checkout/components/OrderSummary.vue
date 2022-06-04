<template>
  <div v-if="cart.cartItems.length" class="ps-form__orders ps-block--checkout-order" id="orden-resume">
    <h3 v-if="!shipping">Tu Orden</h3>
    <div class="ps-block--checkout-order">
      <div class="ps-block__content">
        <figure>
          <figcaption>
            <strong>Producto</strong>
            <strong>total</strong>
          </figcaption>
        </figure>
        <figure class="ps-block__items">
          <nuxt-link v-for="(productItem, index) in product.cartProducts.data" :to="`/product/${productItem.id}`"
            :key="productItem.id" class="ps-product__title">
            Cachitos {{ productItem.attributes.name }}
            <br />
            {{ cart.cartItems[index].quantity }} x ${{
                productItem.attributes.price.toFixed(2)
            }}
          </nuxt-link>
        </figure>
        <figure>
          <figcaption>
            <strong>Subtotal</strong>
            <small>$ {{ cart.amount }}</small>
          </figcaption>
        </figure>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';

const cart = useCart();
const product = useProduct();

type Props = {
  shipping: boolean;
};

defineProps<Props>();

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!cart.cartItems.length) {
    product.cartProducts = null;
    return;
  }

  const response = await product.getCartProducts(itemsId);

  if (response)
    cart.loading = false;
}

onMounted(async () => {
  await loadCartProducts();
});
</script>
