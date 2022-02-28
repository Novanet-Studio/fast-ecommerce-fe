<template lang="html">
    <v-tabs
        background-color="gray"
        color="warning"
        class="ps-tab-list"
        grow
        centered
    >
        <v-tab>
            <a href="#" @click.prevent class="tab-item">Hompages</a>
        </v-tab>
        <v-tab-item>
            <div class="tab-content pt-3">
                <div class="row">
                    <div
                        v-for="demo in homepages"
                        class="col-md-4 col-6"
                        :key="demo.id"
                    >
                        <demo-item :demo="demo" />
                    </div>
                </div>
            </div>
        </v-tab-item>
    </v-tabs>
</template>

<script>
import DemoItem from '~/components/elements/commons/DemoItem';
export default {
    name: 'PageLinks',
    components: { DemoItem },
    data() {
        return {
            homepages: [
                {
                    id: 1,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h11.jpg',
                    url: '/',
                    text: 'Home Fullwidth'
                },
                {
                    id: 2,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h10.jpg',
                    url: '/home/auto-part',
                    text: 'Home Autopart'
                },
                {
                    id: 3,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h5.jpg',
                    url: '/home/electronic',
                    text: 'Home Electronic'
                },
                {
                    id: 4,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h6.jpg',
                    url: '/home/furniture',
                    text: 'Home Furniture'
                },
                {
                    id: 5,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h1.jpg',
                    url: '/home/market-place',
                    text: 'Home Market Place V1'
                },
                {
                    id: 6,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h2.jpg',
                    url: '/home/market-place-2',
                    text: 'Home Market Place V2'
                },
                {
                    id: 7,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h4.jpg',
                    url: '/home/market-place-4',
                    text: 'Home Market Place V4'
                },
                {
                    id: 8,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h8.jpg',
                    url: '/home/organic',
                    text: 'Home Organic'
                },
                {
                    id: 9,
                    thumbnail:
                        'http://demo2.drfuri.com/martfury12/wp-content/themes/martfury-child/images/h9.jpg',
                    url: '/home/technology',
                    text: 'Technology'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped>
.tab-item {
    font-size: 16px;
    color: $color-heading;
    font-weight: 600;
}
</style>
