<template lang="html">
    <div class="ps-catalog-top">
        <div class="row">
            <div class="col-xl-3 col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div class="ps-block--menu-categories">
                    <div class="ps-block__header">
                        <h3>Categories</h3>
                    </div>
                    <div class="ps-block__content">
                        <ul class="ps-list--menu-cateogories">
                            <template v-for="(catalog, index) in catalogs">
                                <li
                                    v-if="catalog.extraClass"
                                    :class="catalog.extraClass"
                                    :key="index"
                                >
                                    <nuxt-link to="/shop">
                                        {{ catalog.text }}
                                    </nuxt-link>
                                    <ul class="{catalog.subClass}">
                                        <li
                                            v-for="item in catalog.subMenu"
                                            :class="item.text"
                                            :key="item.text"
                                        >
                                            <nuxt-link to="/shop">
                                                {{ item.text }}
                                            </nuxt-link>
                                        </li>
                                    </ul>
                                </li>
                                <li v-else>
                                    <nuxt-link to="/shop">
                                        {{ catalog.text }}
                                    </nuxt-link>
                                </li>
                            </template>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="col-xl-9 col-lg-12 col-md-12 col-sm-12 col-12 ">
                <div class="ps-block--categories-grid">
                    <template v-for="(category, index) in categories">
                        <div v-if="index < 6" class="ps-block--category-2">
                            <div class="ps-block__thumbnail">
                                <img :src="category.thumbnail" alt="martfury" />
                            </div>
                            <div class="ps-block__content">
                                <h4>{{ category.title }}</h4>
                                <ul>
                                    <li
                                        v-for="link in category.links"
                                        :key="link"
                                    >
                                        <nuxt-link to="/shop">
                                            {{ link }}
                                        </nuxt-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {
    shop_categories_catalog,
    categories
} from '~/static/data/shopCategories.json';

export default {
    name: 'CatalogTop',
    computed: {
        catalogs() {
            return shop_categories_catalog;
        },
        categories() {
            return categories;
        }
    }
};
</script>

<style lang="scss" scoped></style>
