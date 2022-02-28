<template lang="html">
    <div class="ps-search-trending">
        <div class="container">
            <div class="ps-section__header">
                <h3>Search Trending<span>Updated at 9:00AM</span></h3>
            </div>
            <div class="ps-section__content ps-block--categories-tabs">
                <v-tabs
                    class="ps-tabs"
                    v-model="tab"
                    height="100"
                    fixed-tabs
                    :show-arrows="true"
                >
                    <v-tab
                        v-for="item in tabItems"
                        class="ps-tab-title"
                        :ripple="false"
                        :key="item.text"
                    >
                        <span class="ps-tab__wrapper">
                            <i :class="item.icon"></i>
                            <span>
                                {{ item.text }}
                            </span>
                        </span>
                    </v-tab>
                </v-tabs>
                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in tabItems" :key="item.text">
                        <div class="ps-block__item">
                            <nuxt-link
                                to="/shop"
                                v-for="item in trendingCategories"
                                :key="item.text"
                            >
                                <img :src="item.imagePath" />
                                <span>{{ item.text }}</span>
                            </nuxt-link>
                        </div>
                    </v-tab-item>
                </v-tabs-items>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Market3CategoriesTabs',
    data() {
        return {
            tab: null,
            tabItems: [
                {
                    icon: 'icon-star',
                    text: 'Hot Trending'
                },
                {
                    icon: 'icon-smartphone',
                    text: 'Cellphones'
                },
                {
                    icon: 'icon-desktop',
                    text: 'Hot Trending'
                },
                {
                    icon: 'icon-desktop',
                    text: 'Computers'
                },
                {
                    icon: 'icon-lampshade',
                    text: 'Furnitures'
                },
                {
                    icon: 'icon-shirt',
                    text: 'T-Shirts'
                },
                {
                    icon: 'icon-baby-bottle',
                    text: 'Baby & Mom'
                },
                {
                    icon: 'icon-baseball',
                    text: 'Sports'
                },
                {
                    icon: 'icon-book2',
                    text: 'Book & Office'
                },
                {
                    icon: 'icon-car-siren',
                    text: 'Cars'
                }
            ],
            trendingCategories: [
                {
                    imagePath: '/img/categories/home-5/1.jpg',
                    text: '#television'
                },
                { imagePath: '/img/categories/home-5/2.jpg', text: '#camera' },
                { imagePath: '/img/categories/home-5/3.jpg', text: '#watch' },
                { imagePath: '/img/categories/home-5/4.jpg', text: '#chair' },
                { imagePath: '/img/categories/home-5/5.jpg', text: '#sneaker' },
                { imagePath: '/img/categories/home-5/6.jpg', text: '#xbox' },
                { imagePath: '/img/categories/home-5/7.jpg', text: '#gopro' },
                {
                    imagePath: '/img/categories/home-5/8.jpg',
                    text: '#lipstick'
                },
                { imagePath: '/img/categories/home-5/9.jpg', text: '#phone' },
                { imagePath: '/img/categories/home-5/10.jpg', text: '#laptop' },
                {
                    imagePath: '/img/categories/home-5/11.jpg',
                    text: '#speaker'
                },
                { imagePath: '/img/categories/home-5/12.jpg', text: '#book' },
                {
                    imagePath: '/img/categories/home-5/13.jpg',
                    text: '#blender'
                },
                { imagePath: '/img/categories/home-5/14.jpg', text: '#bag' },
                {
                    imagePath: '/img/categories/home-5/15.jpg',
                    text: '#smartphone'
                },
                { imagePath: '/img/categories/home-5/16.jpg', text: '#camping' }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.ps-tab__item {
    padding: 20px 0;
}
.ps-block__item {
    padding: 16px 20px 30px;
    @media screen and (min-width: 1200px) {
        padding: 20px 60px 60px;
    }
}

.ps-tab__wrapper {
    flex-flow: column wrap !important;
    justify-content: center;
    color: $color-heading;
    i {
        display: block;
        font-size: 36px;
        text-align: center;
        margin-bottom: 10px;
    }
    span {
        display: block !important;
        font-size: 14px;
        text-transform: capitalize;
        font-weight: 400;
        letter-spacing: 0;
        color: $color-text;
    }
}
</style>
