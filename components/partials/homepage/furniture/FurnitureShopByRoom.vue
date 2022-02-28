<template lang="html">
    <div class="ps-section--furniture ps-home-shop-by-room">
        <div class="container">
            <div class="ps-section__header">
                <h3>Shop By Room</h3>
            </div>
            <div class="ps-section__content">
                <div class="row">
                    <div
                        v-for="room in furnitureRoom"
                        class="col-xl-3 col-md-4 col-sm-6 col-12"
                        :key="room.title"
                    >
                        <div class="ps-block--category-room">
                            <div class="ps-block__thumbnail">
                                <nuxt-link to="/shop">
                                    <a>
                                        <img
                                            :src="room.imagePath"
                                            alt="martfury"
                                        />
                                    </a>
                                </nuxt-link>
                            </div>
                            <div class="ps-block__content">
                                <nuxt-link to="/shop">
                                    {{ room.title }}
                                </nuxt-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FurnitureShopByRoom',
    data() {
        return {
            furnitureRoom: [
                {
                    imagePath: '/img/categories/furniture/room-1.png',
                    title: 'Living Rooom'
                },
                {
                    imagePath: '/img/categories/furniture/room-2.png',
                    title: 'Bedroom'
                },
                {
                    imagePath: '/img/categories/furniture/room-3.png',
                    title: 'Dinning Room'
                },
                {
                    imagePath: '/img/categories/furniture/room-4.png',
                    title: 'Kitchen'
                },
                {
                    imagePath: '/img/categories/furniture/room-5.png',
                    title: 'Bathroom'
                },
                {
                    imagePath: '/img/categories/furniture/room-6.png',
                    title: "Kid's Room"
                },
                {
                    imagePath: '/img/categories/furniture/room-7.png',
                    title: 'Patio & Outdoor'
                },
                {
                    imagePath: '/img/categories/furniture/room-8.png',
                    title: 'Office'
                }
            ]
        };
    }
};
</script>

<style lang="scss" scoped></style>
