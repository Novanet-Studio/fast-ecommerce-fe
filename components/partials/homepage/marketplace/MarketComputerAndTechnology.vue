<template lang="html">
    <div class="ps-block--products-of-category">
        <div class="ps-block__categories">
            <h3>Computer & Techologies</h3>
            <ul>
                <li>
                    <nuxt-link to="/shop">
                        Best Seller
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        New Arrivals
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Desktop PC
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Laptop
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Smartphones
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Tablets
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Storage & Memory
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        PC Component
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Game Accessories
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Sales & Deals
                    </nuxt-link>
                </li>
            </ul>
            <nuxt-link to="/shop" class="ps-block__more-link">
                View All
            </nuxt-link>
        </div>
        <div class="ps-block__slider">
            <div class="ps-carousel" v-swiper:mySwiper="carouselSingle">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <a href="#">
                            <img
                                src="~/static/img/slider/home-3/technology-1.jpg"
                                alt="martfury"
                            />
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img
                                src="~/static/img/slider/home-3/technology-2.jpg"
                                alt="martfury"
                            />
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img
                                src="~/static/img/slider/home-3/technology-3.jpg"
                                alt="martfury"
                            />
                        </a>
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
        </div>
        <div class="ps-block__product-box">
            <template v-for="(product, index) in products">
                <product-simple
                    v-if="index < 6"
                    :product="product"
                    :key="product.id"
                />
            </template>
        </div>
    </div>
</template>

<script>
import ProductDefault from '~/components/elements/product/ProductDefault';
import { mapState } from 'vuex';
import { carouselStandard, carouselSingle } from '~/utilities/carousel-helpers';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductSimple from '~/components/elements/product/ProductSimple';
export default {
    name: 'MarketComputerAndTechnology',
    components: { ProductSimple, ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            categories: state => state.collection.categories
        }),

        products() {
            return getColletionBySlug(this.categories, this.collectionSlug);
        }
    },
    data() {
        return {
            carouselSingle: {
                loop: true,
                slidesPerView: 1,
                spaceBetween: 1,
                navigation: {
                    nextEl: '.swiper-next',
                    prevEl: '.swiper-prev'
                }
            }
        };
    }
};
</script>
<style lang="scss" scoped></style>
