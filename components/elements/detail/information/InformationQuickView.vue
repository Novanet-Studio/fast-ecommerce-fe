<template lang="html">
    <div class="ps-product__info">
        <h1>{{ product.name }}</h1>
        <div class="ps-product__meta">
            <p>
                Tipo:
                <nuxt-link to="/shop">
                    <a class="ml-2 text-capitalize">
                        {{ product.category.name }}
                    </a>
                </nuxt-link>
            </p>
            <div class="ps-product__rating">
                <rating />
                <span>(1 review)</span>
            </div>
        </div>
        <h4 v-if="product.is_sale === true" class="ps-product__price sale">
            <del class="mr-2"> $ {{ product.sale_price }}</del>
            ${{ product.price }}
        </h4>

        <h4 v-else class="ps-product__price">${{ product.price }}</h4>
        <module-product-detail-desc :product="product" />

        <div class="ps-product__shopping">
            <figure>
                <figcaption>Cantidad</figcaption>
                <div class="form-group--number">
                    <button class="up" @click.prevent="handleIncreaseQuantity">
                        <i class="fa fa-plus"></i>
                    </button>
                    <button class="down" @click.prevent="handleDescreaseQuantity">
                        <i class="fa fa-minus"></i>
                    </button>
                    <input
                        v-model="quantity"
                        class="form-control"
                        type="text"
                        disabled
                    />
                </div>
            </figure>
            <a
                class="ps-btn ps-btn--black"
                href="#"
                @click.prevent="handleAddToCart"
            >
                Agregar al carrito
            </a>
            <a class="ps-btn" href="#" @click.prevent="handleBuyNow(true)">
                Comprar
            </a>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

import Rating from '~/components/elements/Rating';
import ModuleProductDetailDesc from '~/components/elements/detail/information/modules/ModuleProductDetailDesc';
export default {
    name: 'InformationQuickView',
    components: { ModuleProductDetailDesc, Rating },
    props: {
        product: {
            type: Object,
            default: {}
        }
    },
    computed: {
        ...mapState({
            cartItems: state => state.cart.cartItems
        })
    },

    data(){
        return {
            quantity: 1
        }
    },
    methods: {
        handleIncreaseQuantity() {
            this.quantity++;
        },

        handleDescreaseQuantity() {
            if (this.quantity > 1) {
                this.quantity--;
            }
        },

        handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: this.quantity,
                price: this.product.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            // this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.name} has been added to your cart!`
            });
        },

        handleBuyNow(isBuyNow) {
            const cartItemsOnCookie = this.$cookies.get('cart', {
                parseJSON: true
            });
            let existItem;
            if (cartItemsOnCookie) {
                existItem = cartItemsOnCookie.cartItems.find(
                    item => item.id === this.product.id
                );
            }
            let item = {
                id: this.product.id,
                quantity: this.quantity,
                price: this.product.price
            };
            if (existItem !== undefined) {
                if (this.quantity + existItem.quantity > 10) {
                    this.$notify({
                        group: 'addCartSuccess',
                        title: 'Waring!',
                        text: `Can't add more than 10 items`
                    });
                } else {
                    this.addItemToCart(item);
                    if (isBuyNow && isBuyNow == true) {
                        setTimeout(
                            function() {
                                this.$router.push('/account/checkout');
                            }.bind(this),
                            500
                        );
                    }

                }
            } else {
                this.addItemToCart(item);
                if (isBuyNow && isBuyNow == true) {
                    setTimeout(
                        function() {
                            this.$router.push('/account/checkout');
                        }.bind(this),
                        500
                    );
                }

            }

            // this.$store.dispatch('cart/addProductToCart', item);
            // this.getCartProduct(this.cartItems);
            // this.$notify({
            //     group: 'addCartSuccess',
            //     title: 'Success!',
            //     text: `${this.product.name} has been added to your cart!`
            // });
            // setTimeout(
            //     function() {
            //         this.$router.push('/account/checkout');
            //     }.bind(this),
            //     500
            // );
        },
        async addItemToCart(payload) {
            this.$store.dispatch('cart/addProductToCart', payload);
            // this.getCartProduct(this.cartItems);
             var respuesta = await this.$store.dispatch('product/getCartProducts', this.cartItems)

            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.name} has been added to your cart!`
            });
        },

        async getCartProduct(products) {
            let listOfIds = [];
            products.forEach(item => {
                listOfIds.push(item.id);
            });
            const response = await this.$store.dispatch(
                'product/getCartProducts',
                listOfIds
            );
            if (response) {
                this.$store.commit('cart/setLoading', false);
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
