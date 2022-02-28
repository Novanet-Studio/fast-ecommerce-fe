<template lang="html">
    <div class="ps-compare ps-section--shopping">
        <div class="container">
            <div class="ps-section__header">
                <h1>Compare Product</h1>
            </div>
            <div class="ps-section__content">
                <div class="table-responsive" id="table-compare">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Vendor</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <template v-if="compareItems">
                                <tr
                                    v-for="product in compareItems"
                                    :key="product.id"
                                >
                                    <td width="400px">
                                        <product-shopping-cart
                                            :product="product"
                                        />
                                    </td>
                                    <td>{{ product.price }}</td>
                                    <td>{{ product.vendor }}</td>
                                    <td>
                                        <v-btn
                                            text
                                            color="error"
                                            @click.prevent="
                                                handleRemoveItemFromCompareList(
                                                    product
                                                )
                                            "
                                        >
                                            Remove
                                        </v-btn>
                                    </td>
                                </tr>
                            </template>
                            <template v-else>
                                <tr>
                                    <div></div>
                                </tr>
                            </template>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductMiniCart from '~/components/elements/product/ProductMiniCart';
import ProductShoppingCart from '~/components/elements/product/ProductShoppingCart';
import { getListOfProductId } from '~/utilities/product-helper';

export default {
    name: 'Compare',
    components: { ProductShoppingCart, ProductMiniCart },
    computed: {
        ...mapState({
            total: state => state.compare.total,
            compareItems: state => state.product.compareItems
        })
    },
    methods: {
        handleRemoveItemFromCompareList(product) {
            this.$store.dispatch('compare/removeItemFromCompare', product);
            this.loadCompareProducts();
            this.$notify({
                group: 'addCartSuccess',
                title: 'Remove Item!',
                text: `${product.title} has been removed from your wishlist!`
            });
        },

        async loadCompareProducts() {
            const compareItems = this.$cookies.get('compare', {
                parseJSON: true
            });
            if (compareItems) {
                const queries = getListOfProductId(compareItems.items);
                if (queries.length > 0) {
                    const response = await this.$store.dispatch(
                        'product/getCompareProducts',
                        queries
                    );
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
#table-compare {
    tbody {
        tr {
            td {
                width: 100px;
                &:first-child {
                    width: 400px;
                }
            }
        }
    }
}
</style>
