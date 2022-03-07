<template lang="html">
    <div class="ps-product-list ps-clothings ps-section--carousel-outside">
        <div class="ps-container">
            <div class="ps-section__header">
                <h3>{{ category.name }}</h3>
            </div>
            <div class="ps-section__content">
                <carousel-arrows type="simple" />
                <div
                    class="ps-carousel outside"
                    v-swiper:carousel="carouselSetting"
                >
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" v-for="product in products">
                            <p>HOLAAAAA {{ product.name }}</p>
                            <product-default :product="product" />
                        </div>
                    </div>
                    <!--Carousel controls-->
                    <div
                        class="swiper-pagination swiper-pagination-bullets"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import {mapState} from 'vuex';
import CategoryRepository from '~/repositories/CategoryRepository';
import ProductoRepository from '~/repositories/ProductoRepository';
import { carouselFullwidth } from '~/utilities/carousel-helpers.js';
import ProductDefault from '../../../elements/product/ProductDefault';
import { getColletionBySlug } from '../../../../utilities/product-helper';
import CarouselArrows from '~/components/elements/commons/CarouselArrows';

export default {
    components: { CarouselArrows, ProductDefault },
    props: {
        category: [],
        // collectionSlug: {
        //     type: String,
        //     default: ''
        // }
    },
    // computed: {
    //     ...mapState({
    //         collections: state => state.collection.collections
    //     }),
    //     products() {
    //         return getColletionBySlug(this.collections, this.collectionSlug);
    //     }
    // },
    data() {
        return {
            products: [],
            carouselSetting: {
                ...carouselFullwidth,
                navigation: {
                    nextEl: '.ps-clothings .swiper-next',
                    prevEl: '.ps-clothings .swiper-prev'
                }
            }
        };
    },
    mounted(){
        this.productosByCategoria()
    },
    methods: {
        async productosByCategoria(){
            const productos = new ProductoRepository();
            return await productos.GetProductsByCategory(this.category['id']).then(val => {return this.products = val})
        }
    }
};
</script>
