<template lang="html">
    <div class="ps-shopping">
        <best-sale-items collectionSlug="shop-best-seller-items" />
        <recommend-items collectionSlug="shop-recommend-items" />
        <div class="ps-shopping__header">
            <p>
                <strong class="mr-2">{{ total }}</strong>
                Products found
            </p>
            <div class="ps-shopping__actions">
                <select
                    class="ps-select form-control"
                    data-placeholder="Sort Items"
                >
                    <option>Sort by latest</option>
                    <option>Sort by popularity</option>
                    <option>Sort by average rating</option>
                    <option>Sort by price: low to high</option>
                    <option>Sort by price: high to low</option>
                </select>
                <div class="ps-shopping__view">
                    <p>View</p>
                    <ul class="ps-tab-list">
                        <li :class="listView !== true ? 'active' : ''">
                            <a href="#" @click.prevent="handleChangeViewMode">
                                <i class="icon-grid"></i>
                            </a>
                        </li>
                        <li :class="listView === true ? 'active' : ''">
                            <a href="#" @click.prevent="handleChangeViewMode">
                                <i class="icon-list4"></i>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="ps-shopping__content">
            <div v-if="queries" class="ps-shopping__queries">
                <a v-for="query in queries" href="#" @click.prevent="">
                    {{ query }}
                </a>
            </div>
            <div v-if="listView === false" class="ps-shopping-product">
                <div class="row">
                    <div
                        v-for="product in products"
                        class="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6 "
                        :key="product.id"
                    >
                        <product-default :product="product" />
                    </div>
                </div>
                <footer class="mt-30">
                    <v-pagination
                        color="#fcb800"
                        total-visible="8"
                        v-model="page"
                        :length="paginationLenght"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>
            <div v-else class="ps-shopping-product">
                <product-wide
                    v-for="product in products"
                    :product="product"
                    :key="product.id"
                />
                <footer class="mt-30">
                    <v-pagination
                        color="#fcb800"
                        v-model="page"
                        total-visible="8"
                        :length="paginationLenght"
                        @input="handleChangePagination"
                    />
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import ProductDefault from '~/components/elements/product/ProductDefault';
import RecommendItems from '~/components/partials/shop/sections/RecommendItems';
import BestSaleItems from '~/components/partials/shop/sections/BestSaleItems';
import ProductWide from '~/components/elements/product/ProductWide';

export default {
    name: 'LayoutShop',
    components: { ProductWide, BestSaleItems, RecommendItems, ProductDefault },
    computed: {
        ...mapState({
            products: state => state.product.products,
            total: state => state.product.total,
            queries: state => state.collection.queries
        }),
        paginationLenght() {
            if (this.total % 12 === 0) {
                return parseInt(this.total / this.pageSize);
            } else {
                return parseInt(this.total / 12 + 1);
            }
        }
    },
    data() {
        return {
            listView: false,
            page: 1,
            pageSize: 12
        };
    },
    methods: {
        async handleChangePagination(value) {
            const params = {
                _start: value === 1 ? 0 : (value - 1) * 12,
                _limit: 12
            };
            await this.$store.dispatch('product/getProducts', params);
        },
        handleChangeViewMode() {
            this.listView = !this.listView;
        }
    }
};
</script>

<style lang="scss" scoped></style>
