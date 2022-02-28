<template lang="html">
    <div class="ps-top-categories">
        <div class="container">
            <h3>Top categories of the month</h3>
            <div class="row">
                <div
                    v-for="category in electronicCategories"
                    class="col-md-4 col-sm-6 col-12 "
                    :key="category.title"
                >
                    <div class="ps-block--category-2">
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
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ElectronicTopCategories',
    data() {
        return {
            electronicCategories: [
                {
                    thumbnail: '/img/categories/electronic/2.jpg',
                    title: 'Tv Televisions',
                    links: [
                        'Smart TV',
                        '4K Ultra HD TVs',
                        'LED TVs',
                        'OLED TVs',
                        'Accessories'
                    ]
                },
                {
                    thumbnail: '/img/categories/electronic/4.jpg',
                    title: 'Air Conditioners',
                    links: [
                        'Type Hanging On Wall',
                        'Type Erect',
                        'Type Hanging On Celling',
                        'Accessories'
                    ]
                },
                {
                    thumbnail: '/img/categories/electronic/3.jpg',
                    title: 'Washing Machine',
                    links: [
                        'Type Hanging On Wall',
                        'Type Erect',
                        'Type Hanging On Celling',
                        'Accessories'
                    ]
                },
                {
                    thumbnail: '/img/categories/electronic/1.jpg',
                    title: 'Audios & Theaters',
                    links: [
                        'Speakers',
                        'Home Theater System',
                        'Wireless Audio',
                        'Headphone',
                        'Accessories'
                    ]
                },
                {
                    thumbnail: '/img/categories/electronic/6.jpg',
                    title: 'Office Electronics',
                    links: [
                        'Printers',
                        'Store & Business',
                        'Scanners',
                        'Projectors',
                        'Phones'
                    ]
                },
                {
                    thumbnail: '/img/categories/electronic/8.jpg',
                    title: 'Phones',
                    links: [
                        'Printers',
                        'Store & Business',
                        'Scanners',
                        'Projectors',
                        'Phones'
                    ]
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
