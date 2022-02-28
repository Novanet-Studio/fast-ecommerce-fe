<template lang="html">
    <form
        class="ps-form--quick-search"
        @submit.prevent="handleSubmit"
        v-click-outside="handleClickOutside"
    >
        <div class="ps-form__categories">
            <select class="form-control">
                <option v-for="item in exampleCategories" :value="{ item }">
                    {{ item }}
                </option>
            </select>
        </div>
        <div class="ps-form__input">
            <input
                v-model="searchText"
                class="form-control"
                type="text"
                placeholder="I'm shopping for..."
                @keyup="handleSearchProduct"
            />
            <v-progress-circular
                v-if="isLoading"
                indeterminate
                color="#fcb800"
                width="2"
                size="16"
            />
        </div>

        <button>{{ $t('menu.navigationList.search') }}</button>
        <div
            :class="
                `ps-panel--search-result ${
                    isSearching === true && isLoading === false ? 'active' : ''
                }`
            "
        >
            <div class="ps-panel__content">
                <template v-if="searchResults && searchResults.length > 0">
                    <product-result
                        v-for="product in searchResults"
                        :product="product"
                        :key="product.id"
                    />
                </template>
                <span>Not found! Try with another keyword.</span>
            </div>
            <div class="ps-panel__footer text-center">
                <nuxt-link to="/search">
                    See all results
                </nuxt-link>
            </div>
        </div>
    </form>
</template>

<script>
import { mapState } from 'vuex';
import ProductResult from '~/components/elements/product/ProductResult';

export default {
    name: 'SearchHeader',
    components: { ProductResult },
    computed: {
        ...mapState({
            searchResults: state => state.product.searchResults
        })
    },
    data() {
        return {
            exampleCategories: [
                'All',
                'Babies & Moms',
                'Books & Office',
                'Cars & Motocycles',
                'Clothing & Apparel',
                ' Accessories',
                'Bags',
                'Kid’s Fashion',
                'Mens',
                'Shoes',
                'Sunglasses',
                'Womens',
                'Computers & Technologies',
                'Desktop PC',
                'Laptop',
                'Smartphones',
                'Consumer Electrics',
                'Air Conditioners',
                'Accessories',
                'Type Hanging Cell',
                'Audios & Theaters',
                'Headphone',
                'Home Theater System',
                'Speakers',
                'Car Electronics',
                'Audio & Video',
                'Car Security',
                'Radar Detector',
                'Vehicle GPS',
                'Office Electronics',
                'Printers',
                'Projectors',
                'Scanners',
                'Store & Business',
                'Refrigerators',
                'TV Televisions',
                '4K Ultra HD TVs',
                'LED TVs',
                'OLED TVs',
                'Washing Machines',
                'Type Drying Clothes',
                'Type Horizontal',
                'Type Vertical',
                'Garden & Kitchen',
                'Cookware',
                'Decoration',
                'Furniture',
                'Garden Tools',
                'Home Improvement',
                'Powers And Hand Tools',
                'Utensil & Gadget',
                'Health & Beauty',
                'Equipments',
                'Hair Care',
                'Perfumer',
                'Wine Cabinets'
            ],
            isSearching: false,
            isLoading: false,
            searchText: ''
        };
    },
    methods: {
        async handleSearchProduct(e) {
            if (e.target.value !== '') {
                this.isSearching = true;
                const query = {
                    title_contains: e.target.value
                };
                this.isLoading = true;
                const result = await this.$store.dispatch(
                    'product/getProductByKeyword',
                    query
                );
                if (result) {
                    setTimeout(
                        function() {
                            this.isLoading = false;
                        }.bind(this),
                        500
                    );
                }
            } else {
                this.isSearching = false;
            }
        },
        handleClickOutside() {
            this.searchText = '';
            this.isSearching = false;
            this.isLoading = false;
        },

        handleSubmit() {
            if (this.searchText !== null || this.searchText !== '') {
                this.$router.push(`/search?keyword=${this.searchText}`);
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.ps-form--quick-search {
    .ps-form__input {
        position: relative;
        width: 100%;
        .v-progress-circular {
            @include vertical-align();
            right: 10px;
            z-index: 20;
        }
    }
}
</style>
