<template lang="html">
    <div class="ps-panel--sidebar">
        <div class="ps-panel__header">
            <h3>Shopping Cart</h3>
            <a
                href="#"
                class="ps-panel__close"
                @click.prevent="handleClosePanel"
            >
                <i class="icon icon-cross"></i>
            </a>
        </div>
        <div class="ps-panel__content">
            <div class="ps-cart--mobile">
                <div class="ps-cart__content">
                    <div v-if="cartProducts !== null" class="ps-cart__items">
                        <product-mini-cart
                            v-for="product in cartProducts"
                            :product="product"
                            :key="product.id"
                        />
                    </div>
                    <div v-else class="ps-cart__items">
                        <span>No Product.</span>
                    </div>
                </div>
                <div v-if="cartProducts !== null" class="ps-cart__footer">
                    <h3>
                        Sub Total:<strong>${{ cart.amount }}</strong>
                    </h3>
                    <figure>
                        <div>
                            <nuxt-link
                                to="/account/shopping-cart"
                                class="ps-btn"
                            >
                                View Cart
                            </nuxt-link>
                        </div>
                        <div>
                            <nuxt-link
                                to="/account/checkout"
                                class="ps-btn ps-btn--black"
                            >
                                Checkout
                            </nuxt-link>
                        </div>
                    </figure>
                </div>
                <div v-else class="ps-cart__footer">
                    <nuxt-link to="/shop" class="ps-btn ps-btn--fullwidth">
                        Shop now
                    </nuxt-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductMiniCart from '~/components/elements/product/ProductMiniCart';

export default {
    name: 'PanelShoppingCart',
    components: { ProductMiniCart },
    computed: {
        ...mapState({
            cart: state => state.cart,
            cartProducts: state => state.product.cartProducts
        })
    },
    methods: {
        handleClosePanel() {
            this.$store.commit('app/setCurrentDrawerContent', null);
            this.$store.commit('app/setAppDrawer', false);
        }
    }
};
</script>

<style lang="scss" scoped>
.ps-cart--mobile {
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    width: 100%;
    > * {
        flex-basis: 100%;
        height: 100%;
    }
    figure {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        margin: 0 -5px;
        > div {
            flex-basis: 50%;
            padding: 0 5px;
            .ps-btn {
                padding: 12px 25px;
                text-align: center;
                width: 100%;
            }
        }
    }

    .ps-cart__content {
        max-height: calc(100% - 100px);
        overflow-y: auto;
    }

    .ps-cart__footer {
        padding: 10px 0;
        max-height: 100px;
        width: 100%;
        border-top: 1px solid #e1e1e1;
        h3 {
            display: block;
            margin-bottom: 20px;
            font-size: 18px;
            font-weight: 600;

            strong {
                float: right;
                color: $color-danger;
            }
        }
    }
}

.ps-panel__content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    height: calc(100% - 50px);
}
</style>
