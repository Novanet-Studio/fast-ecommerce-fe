<template lang="html">
    <div class="ps-shop-categories">
        <div class="row align-content-lg-stretch">
            <div
                v-for="category in shopCategories"
                class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-12 "
                :key="category.id"
            >
                <div class="ps-block--category-2" data-mh="categories">
                    <div class="ps-block__thumbnail">
                        <img :src="category.thumbnail" alt="martfury" />
                    </div>
                    <div class="ps-block__content">
                        <h4>{{ category.title }}</h4>
                        <ul>
                            <li v-for="link in category.links" :key="link">
                                <nuxt-link to="/shop">
                                    <a>{{ link }}</a>
                                </nuxt-link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { categories } from '~/static/data/shopCategories.json';

export default {
    name: 'ShopCategories',
    computed: {
        shopCategories() {
            return categories;
        }
    }
};
</script>

<style lang="scss" scoped></style>
