<template lang="html">
    <div class="ps-block--products-of-category">
        <div class="ps-block__categories">
            <h3>
                Home <br />
                Garden & Kitchen
            </h3>
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
                        Furniture
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Home Decor
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Cookware
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Utensils & Gadget
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Garden Tools
                    </nuxt-link>
                </li>
                <li>
                    <nuxt-link to="/shop">
                        Acessesories
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
                                src="~/static/img/slider/home-3/kitchen-1.jpg"
                                alt="martfury"
                            />
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img
                                src="~/static/img/slider/home-3/kitchen-2.jpg"
                                alt="martfury"
                            />
                        </a>
                    </div>
                    <div class="swiper-slide">
                        <a href="#">
                            <img
                                src="~/static/img/slider/home-3/kitchen-3.jpg"
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
    name: 'MarketGardenAndKitchen',
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
