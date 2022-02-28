<template lang="html">
    <section class="ps-top-categories">
        <div class="container">
            <h3>Top categories of the month</h3>
            <div class="row">
                <div
                    v-for="category in topCategories"
                    class="col-xl-2 col-lg-3 col-md-4 col-sm-6 col-6 "
                    :key="category.title"
                >
                    <div class="ps-block--category" data-mh="categories">
                        <div class="ps-block__thumbnail">
                            <img :src="category.imagePath" alt="martfury" />
                        </div>
                        <div class="ps-block__content">
                            <p>{{ category.title }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: 'TechnologyTopCategories',
    data() {
        return {
            topCategories: [
                {
                    imagePath: '/img/categories/technology/1.jpg',
                    title: 'Smartphone'
                },
                {
                    imagePath: '/img/categories/technology/2.jpg',
                    title: 'Tables'
                },
                {
                    imagePath: '/img/categories/technology/3.jpg',
                    title: 'Laptops'
                },
                {
                    imagePath: '/img/categories/technology/4.jpg',
                    title: 'Sounds'
                },
                {
                    imagePath: '/img/categories/technology/5.jpg',
                    title: 'Technology Toys'
                },
                {
                    imagePath: '/img/categories/technology/6.jpg',
                    title: 'Accessories'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
