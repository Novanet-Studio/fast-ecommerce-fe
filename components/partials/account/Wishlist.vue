<template lang="html">
    <div class="ps-section--shopping ps-whishlist">
        <div class="container">
            <div class="ps-section__header">
                <h1>Wishlist</h1>
            </div>
            <div class="ps-section__content">
                <div class="table-responsive">
                    <table class="table ps-table--whishlist">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Product name</th>
                                <th>Unit Price</th>
                                <th>Vendor</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr
                                v-for="product in wishlistItems"
                                :key="product.id"
                            >
                                <td>
                                    <a
                                        href="#"
                                        @click.prevent="
                                            handleRemoveItemFromWishlist(
                                                product
                                            )
                                        "
                                    >
                                        <i class="icon-cross"></i>
                                    </a>
                                </td>
                                <td>
                                    <product-shopping-cart :product="product" />
                                </td>
                                <td class="price">
                                    $ {{ product.price.toFixed(2) }}
                                </td>
                                <td>{{ product.vendor }}</td>
                                <td>
                                    <a
                                        class="ps-btn"
                                        href="#"
                                        @click.prevent="
                                            handleAddToCart(product)
                                        "
                                    >
                                        Add to cart
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';
import { getListOfProductId } from '~/utilities/product-helper';
export default {
    name: 'Wishlist',
    components: { ProductShoppingCart },
    computed: {
        ...mapState({
            wishlistItems: state => state.product.wishlistItems
        })
    },
    methods: {
        handleAddToCart(product) {
            let item = {
                id: product.id,
                quantity: 1,
                price: product.price
            };
            this.$store.dispatch('cart/addProductToCart', item);
            this.$notify({
                group: 'addCartSuccess',
                title: 'Success!',
                text: `${product.title} has been added to your cart!`
            });
        },
        handleRemoveItemFromWishlist(product) {
            this.$store.dispatch('wishlist/removeItemFromWishlist', product);
            this.loadWishlist();
            this.$notify({
                group: 'addCartSuccess',
                title: 'Remove Item!',
                text: `${product.title} has been removed from your wishlist!`
            });
        },
        async loadWishlist() {
            const wishlistItemsOnCookie = this.$cookies.get('wishlist', {
                parseJSON: true
            });
            if (wishlistItemsOnCookie) {
                const queries = getListOfProductId(wishlistItemsOnCookie.items);
                if (queries.length >= 0) {
                    const response = await this.$store.dispatch(
                        'product/getWishlishtProducts',
                        queries
                    );
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
