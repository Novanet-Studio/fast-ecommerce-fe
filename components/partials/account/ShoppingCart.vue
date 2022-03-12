<template lang="html">
    <div class="ps-section--shopping ps-shopping-cart">
        <div class="container">
            <div class="ps-section__header">
                <h1>Carrito de compras</h1>
            </div>
            <div class="ps-section__content">
                <table-shopping-cart v-if="cartProducts !== '' " />
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
                                <input
                                    class="form-control"
                                    type="text"
                                    placeholder=""
                                />
                            </div>
                            <div class="form-group">
                                <button class="ps-btn ps-btn--outline">
                                    Aplicar
                                </button>
                            </div>
                        </figure>
                    </div>
                    <div
                        class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 "
                    ></div>
                    <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12 ">
                        <div class="ps-block--shopping-total">
                            <div class="ps-block__header">
                                <p>
                                    Subtotal <span> ${{ total }}</span>
                                </p>
                            </div>
                            <div class="ps-block__content">
                                <ul class="ps-block__product">
                                    <li
                                        v-for="(product, index) in cartProducts"
                                    >
                                        <span class="ps-block__estimate">
                                            <nuxt-link
                                                :to="`/product/${product.id}`"
                                                class="ps-product__title"
                                            >
                                                {{ product.name }}
                                                <br />
                                                x
                                                {{ cartItems[index].quantity }}
                                            </nuxt-link>
                                        </span>
                                    </li>
                                </ul>
                                <h3>
                                    Total <span>${{ amount }}</span>
                                </h3>
                            </div>
                        </div>
                        <nuxt-link
                            to="/account/checkout"
                            class="ps-btn ps-btn--fullwidth"
                        >
                            Proceder a la compra
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';
import TableShoppingCart from '~/components/partials/account/modules/TableShoppingCart';

export default {
    name: 'ShoppingCart',
    components: { TableShoppingCart, ProductShoppingCart },
    data(){
        return {
            cartProducts: ''
        }
    },
    computed: {
        ...mapState({
            cart: state => state.cart,
            total: state => state.cart.total,
            amount: state => state.cart.amount,
            cartItems: state => state.cart.cartItems,
            // cartProducts: state => state.product.cartProducts
        })
    },
    mounted(){
        // console.log(this.cart)
        // console.log(this.cartItems)
        console.log(this.cartProducts)
        this.cartProductos()
    },
    methods: {
        async cartProductos(){
            if(this.cart.cartItems.length > 0){
                this.cartProducts =  await this.$store.dispatch('product/getCartProducts', this.cartItems)
               return this.cartProducts;
            }        
        }
    }
};
</script>

<style lang="scss" scoped></style>
