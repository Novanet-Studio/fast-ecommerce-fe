<template lang="html">
    <div class="ps-carousel" v-swiper:carouselBestSeller="carouselSetting">
        <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="product in products">
                <product-default :product="product" />
            </div>
        </div>
        <!--Carousel controls-->
        <div class="swiper-nav">
            <span class="swiper-arrow swiper-prev"
                ><i class="icon-chevron-left"></i
            ></span>
            <div class="swiper-arrow swiper-next">
                <i class="icon-chevron-right"></i>
            </div>
        </div>
        <div class="swiper-pagination swiper-pagination-bullets"></div>
    </div>
</template>

<script>
import {
    carouselFullwidth,
    carouselStandard
} from '~/utilities/carousel-helpers';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'BestSellerInLastMonth',
    components: { ProductDefault },
    props: {
        products: {
            type: Array,
            default: []
        }
    },
    computed: {
        carouselSetting() {
            return carouselStandard;
        }
    }
};
</script>

<style lang="scss" scoped></style>
