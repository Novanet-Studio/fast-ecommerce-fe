<template lang="html">
    <div class="ps-section--shopping ps-whishlist">
        <div class="container">
            <div class="ps-section__header">
                <h1>Wishlist</h1>
            </div>
            <div v-if="!wishlistItems" class="ps-section__content"> 
                <div  class="table-responsive container" >
                    <h3>No tienes articulos en tu lista de deseos</h3>
                </div>
            </div>
            <div v-else class="ps-section__content">
                <div class="table-responsive">
                    <table class="table ps-table--whishlist">
                        <thead>
                            <tr>
                                <th></th>
                                <th>Nombre</th>
                                <th>Precio por unidad</th>
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
    mounted(){
        this.loadWishlist()
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
                text: `${product.name} has been added to your cart!`
            });
        },
        handleRemoveItemFromWishlist(product) {
            // return console.log(product)
            this.$store.dispatch('wishlist/removeItemFromWishlist', product);
            this.loadWishlist();
            this.$notify({
                group: 'addCartSuccess',
                title: 'Remove Item!',
                text: `${product.name} has been removed from your wishlist!`
            });
        },
        async loadWishlist() {
            const wishlistItemsOnCookie = this.$cookies.get('wishlist', {
                parseJSON: true
            });
            // return console.log(wishlistItemsOnCookie)
            if (wishlistItemsOnCookie.items.length > 0) {
                const queries = getListOfProductId(wishlistItemsOnCookie.items);
                // return queries
                if (queries.length >= 0) {
                    const response = await this.$store.dispatch(
                        'product/getWishlishtProducts',
                        queries
                    );
                }
            }else{
                this.$store.commit('product/setWishlistItems', false)
            }
            // console.log(this.wishlistItems)
        }
    }
};
</script>

<style lang="scss" scoped></style>
