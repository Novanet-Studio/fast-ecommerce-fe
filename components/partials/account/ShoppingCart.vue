<template lang="html">
  <div class="ps-section--shopping ps-shopping-cart">
    <div v-if="cartItems.length > 0" class="container">
      <div class="ps-section__header">
        <h1>Carrito de compras</h1>
      </div>
      <div class="ps-section__content">
        <table-shopping-cart
          v-if="cartProducts !== null"
          :item="cartProducts.data"
        />
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
                  Subtotal <span> ${{ amount }} </span>
                </p>
              </div>
              <div class="ps-block__content">
                <ul class="ps-block__product">
                  <li v-for="(product, index) in cartProducts.data">
                    <span class="ps-block__estimate">
                      <nuxt-link
                        :to="`/product/${product.id}`"
                        class="ps-product__title"
                      >
                        Cachitos {{ product.attributes.name }}
                        <br />
                        <module-quantity :product="product" />
                      </nuxt-link>
                    </span>
                  </li>
                </ul>
                <h3>
                  Total <span>${{ amount }}</span>
                </h3>
              </div>
            </div>
            <nuxt-link to="/account/checkout" class="ps-btn ps-btn--fullwidth">
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
        <h3 class="empy-cart">
          No tiene elementos agregado al carrito actualmente
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import ProductShoppingCart from "~/components/elements/product/ProductShoppingCart";
import TableShoppingCart from "~/components/partials/account/modules/TableShoppingCart";
import ModuleQuantity from "~/components/partials/account/modules/ModuleQuantity";

export default {
  name: "ShoppingCart",
  components: { TableShoppingCart, ProductShoppingCart, ModuleQuantity },
  data() {
    return {
      products: false,
    };
  },
  computed: {
    ...mapState({
      cart: (state) => state.cart,
      total: (state) => state.cart.total,
      amount: (state) => state.cart.amount,
      cartItems: (state) => state.cart.cartItems,
      cartProducts: (state) => state.product.cartProducts,
    }),
    quantity() {
      if (this.cartItems !== null) {
        const cartItem = this.cartItems.find(
          (item) => item.id === this.product.id
        );
        if (cartItem !== undefined) {
          return cartItem.quantity;
        } else {
          return null;
        }
      } else {
        return null;
      }
    },
  },
  async mounted() {
    this.loadCartProducts();

    console.log("====> productos del carrito", this.cartProducts);
  },
  methods: {
    async loadCartProducts() {
      // console.log('di click')
      const cookieCart = this.$cookies.get("cart", { parseJSON: true });
      let queries = [];
      cookieCart?.cartItems?.forEach((item) => {
        queries.push(item?.id);
      });

      // return console.log(queries)
      if (this.cartItems.length > 0) {
        const response = await this.$store.dispatch(
          "product/getCartProducts",
          queries
        );
        //  console.log(response)
        if (response) {
          this.$store.commit("cart/setLoading", false);
          // this.cartProducts = response;
        }
      } else {
        this.$store.commit("product/setCartProducts", null);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
