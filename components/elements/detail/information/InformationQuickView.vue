<template lang="html">
    <div class="ps-product__info">
        <h1>{{ product.title }}</h1>
        <div class="ps-product__meta">
            <p>
                Brand:
                <nuxt-link to="/shop">
                    <a class="ml-2 text-capitalize">
                        {{ product.vendor }}
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
                <figcaption>Quantity</figcaption>
                <div class="form-group--number">
                    <button class="up">
                        <i class="fa fa-plus"></i>
                    </button>
                    <button class="down">
                        <i class="fa fa-minus"></i>
                    </button>
                    <input
                        class="form-control"
                        type="text"
                        disabled
                        value="1"
                    />
                </div>
            </figure>
            <a
                class="ps-btn ps-btn--black"
                href="#"
                @click.prevent="handleAddToCart"
            >
                Add to cart
            </a>
            <a class="ps-btn" href="#" @click.prevent="handleBuyNow">
                Buy Now
            </a>
        </div>
    </div>
</template>

<script>
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
    methods: {
        handleAddToCart() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.title} has been added to your cart!`
            });
        },

        handleBuyNow() {
            let item = {
                id: this.product.id,
                quantity: 1,
                price: this.product.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.getCartProduct(this.cartItems);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${this.product.title} has been added to your cart!`
            });
            setTimeout(
                function() {
                    this.$router.push('/account/checkout');
                }.bind(this),
                500
            );
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
