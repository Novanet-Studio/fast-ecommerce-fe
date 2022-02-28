<template lang="html">
    <section class="ps-top-categories">
        <div class="container">
            <div class="ps-section__header">
                <h3>TOP CATEGORIES OF THE MONTH</h3>
            </div>
            <div class="ps-section__content"></div>
            <div class="row align-content-lg-stretch">
                <div
                    v-for="category in autoPartCategories"
                    class="col-md-4 col-sm-6 col-12"
                    :key="category.title"
                >
                    <div
                        class="ps-block--category-2 ps-block--category-auto-part"
                    >
                        <div class="ps-block__thumbnail">
                            <img :src="category.thumbnail" alt="martfury" />
                        </div>
                        <div class="ps-block__content">
                            <h4>{{ category.title }}</h4>
                            <ul>
                                <li v-for="link in category.links" :key="link">
                                    <nuxt-link to="/shop">
                                        {{ link }}
                                    </nuxt-link>
                                </li>
                                <li class="more">
                                    <nuxt-link to="/shop">
                                        More
                                        <i class="icon-chevron-right"></i>
                                    </nuxt-link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'AutopartCategories',
    data() {
        return {
            autoPartCategories: [
                {
                    thumbnail: '/img/categories/home-2/1.jpg',
                    title: 'INTERIOR',
                    links: [
                        'Seats',
                        'Steering Wheels',
                        'Dash Cover',
                        'Floor Mats'
                    ]
                },
                {
                    thumbnail: '/img/categories/home-2/2.jpg',
                    title: 'EXTERIOR',
                    links: [
                        'Running Boards',
                        'Custom Grilles',
                        'Off-Road Bumpers',
                        'Body Kits'
                    ]
                },
                {
                    thumbnail: '/img/categories/home-2/3.jpg',
                    title: 'WHEELS & TIRES',
                    links: [
                        'Custom Wheels',
                        'Tires',
                        'Factory Wheels',
                        'Center Caps'
                    ]
                },
                {
                    thumbnail: '/img/categories/home-2/4.jpg',
                    title: 'PERFORMANCE',
                    links: [
                        'Exhausted System',
                        'Brakes',
                        'Performance Chips',
                        'Starting & Charging'
                    ]
                },
                {
                    thumbnail: '/img/categories/home-2/5.jpg',
                    title: 'BODY PARTS',
                    links: ['Mirrors', 'Hoods', 'Bumpers', 'Quater Panels']
                },
                {
                    thumbnail: '/img/categories/home-2/6.jpg',
                    title: 'LIGHTING',
                    links: ['Headlight', 'Off-Road Light', 'WSingnal Light']
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
