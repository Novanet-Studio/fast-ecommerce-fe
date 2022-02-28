<template lang="html">
    <div class="ps-product--detail ps-product--hot-deal">
        <div class="ps-product__header">
            <thumbnail-deal-hot :product="product" />
            <div class="ps-product__info">
                <h5>Investor</h5>
                <h3 class="ps-product__name">
                    <nuxt-link
                        :to="`/product/${product.id}`"
                        class="ps-product__title"
                    >
                        {{ product.title }}
                    </nuxt-link>
                </h3>

                <div class="ps-product__meta">
                    <h4
                        v-if="product.is_sale === true"
                        class="ps-product__price sale"
                    >
                        <del class="mr-2"> $ {{ product.sale_price }}</del>
                        ${{ product.price }}
                    </h4>
                    <h4 v-else class="ps-product__price">
                        ${{ product.price }}
                    </h4>
                    <div class="ps-product__rating">
                        <rating />
                        <span>(1 review)</span>
                    </div>
                    <div class="ps-product__specification">
                        <p>
                            Status:
                            <strong class="in-stock">
                                In Stock
                            </strong>
                        </p>
                    </div>
                </div>
                <div class="ps-product__expires">
                    <p>Expires In</p>
                    <count-down
                        time="12 31 2020, 0:00 am"
                        format="MM DD YYYY, h:mm a"
                    />
                </div>
                <div class="ps-product__processs-bar">
                    <v-progress-linear
                        color="#fcb800"
                        height="10"
                        value="70"
                        rounded
                    />
                    <p><strong>16/79</strong> Sold</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Rating from '~/components/elements/commons/Rating';
import ThumbnailDealHot from '~/components/elements/detail/thumbnail/ThumbnailDealHot';
import CountDown from '~/components/elements/commons/CountDown';
export default {
    name: 'ProductDealHot',
    components: { CountDown, ThumbnailDealHot, Rating },
    props: {
        product: {
            type: Object,
            default: () => {}
        }
    }
};
</script>

<style lang="scss" scoped></style>
