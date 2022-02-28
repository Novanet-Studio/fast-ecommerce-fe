<template lang="html">
    <div class="ps-shopping">
        <div class="ps-shopping__header">
            <p>
                <strong class="mr-2">{{
                    searchResults !== null ? searchResults.length : 0
                }}</strong>
                Product(s) found
            </p>
        </div>
        <div class="ps-shopping__content">
            <template v-if="searchResults && searchResults.length > 0">
                <div class="row">
                    <div
                        v-for="product in searchResults"
                        class="col-md-3"
                        :key="product.id"
                    >
                        <product-default :product="product" />
                    </div>
                </div>
                <div class="ps-shopping__footer text-center pt-40"></div>
            </template>
            <template v-else>
                <span>No Record.</span>
            </template>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'SearchResult',
    components: { ProductDefault },
    computed: {
        ...mapState({
            searchResults: state => state.product.searchResults
        })
    }
};
</script>

<style lang="scss" scoped></style>
