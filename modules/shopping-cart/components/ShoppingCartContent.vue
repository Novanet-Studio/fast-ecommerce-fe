<template>
  <div class="ps-section--shopping ps-shopping-cart">
    <div v-if="cart.cartItems.length" class="container">
      <div class="ps-section__header">
        <h1>Carrito de compras</h1>
      </div>
      <div class="ps-section__content">
        <shopping-cart-table v-if="productStore.cartProducts?.length" :item="productStore.cartProducts?.data" />
        <p v-else>Carrito vacio</p>
        <div class="ps-section__cart-actions">
          <nuxt-link to="/shop" class="ps-btn">
            <i class="icon-arrow-left mr-2"></i>
            Regresar
          </nuxt-link>
        </div>
      </div>
      <div class="ps-section__footer">
        <div class="row justify-content-end">
          <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
            <figure>
              <figcaption>Cupon de descuento</figcaption>
              <div class="form-group">
                <input class="form-control" type="text" placeholder="" />
              </div>
              <div class="form-group">
                <button class="ps-btn ps-btn--outline">
                  Aplicar
                </button>
              </div>
            </figure>
          </div>
          <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 "></div>
          <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
            <div class="ps-block--shopping-total">
              <div class="ps-block__header">
                <p>
                  Subtotal <span> ${{ cart.amount }} </span>
                </p>
              </div>
              <div class="ps-block__content">
                <ul class="ps-block__product">
                  <li v-for="(product, index) in productStore.cartProducts?.data" :key="index">
                    <span class="ps-block__estimate">
                      <nuxt-link :to="`/product/${product.id}`" class="ps-product__title">
                        Cachitos {{ product.attributes.name }}
                        <br />
                        <quantity-section :product="product" />
                      </nuxt-link>
                    </span>
                  </li>
                </ul>
                <h3>
                  Total <span>${{ cart.amount }}</span>
                </h3>
              </div>
            </div>
            <nuxt-link to="/checkout" class="ps-btn ps-btn--fullwidth">
              Proceder a la compra
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="contaniner">
      <div class="ps-section__header">
        <h1>Carrito de compras</h1>
      </div>
      <div class="ps-section__content">
        <h3 class="empy-cart">No tiene elementos agregado al carrito actualmente</h3>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useCart } from '~/store/cart';
import { useProduct } from '~/store/product';

// TODO: add typings
const product = ref<any>(null);

const cart = useCart();
const productStore = useProduct();

const quantity = computed(() => {
  if (!cart.cartItems.length) return null;

  const cartItem = cart.cartItems.find((item) => item.id === product.id);

  if (!cartItem) return null;

  return cartItem.quantity;
});

const loadCartProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);

  if (!cart.cartItems.length) {
    productStore.cartProducts = null;
    return;
  }

  const response = await productStore.getCartProducts(itemsId);

  if (response)
    cart.loading = false;
}

onMounted(async () => {
  await loadCartProducts();
});
</script>
