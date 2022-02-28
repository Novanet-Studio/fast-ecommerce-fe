<template lang="html">
    <div class="ps-block--container-hightlight">
        <div class="ps-section__header">
            <h3>Top Deals Super Hot Today</h3>
        </div>
        <div class="ps-section__content">
            <div class="row">
                <div
                    v-for="product in products"
                    class="col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6 "
                    :key="product.id"
                >
                    <product-default :product="product" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'ShopCarouselTopDeal',
    components: { ProductDefault },
    props: {
        collectionSlug: {
            type: String,
            default: ''
        }
    },
    computed: {
        ...mapState({
            collections: state => state.collection.collections
        }),

        products() {
            return getColletionBySlug(this.collections, this.collectionSlug);
        }
    }
};
</script>

<style lang="scss" scoped></style>
