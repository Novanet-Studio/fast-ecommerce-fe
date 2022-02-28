<template lang="html">
    <section>
        <aside class="widget widget_product widget_features">
            <p><i class="icon-network"></i> Shipping worldwide</p>
            <p>
                <i class="icon-3d-rotate"></i>
                Free 7-day return if eligible, so easy
            </p>
            <p>
                <i class="icon-receipt"></i> Supplier give bills for this
                product.
            </p>
            <p>
                <i class="icon-credit-card"></i> Pay online or when receiving
                goods
            </p>
        </aside>
        <aside class="widget widget_sell-on-site">
            <p>
                <i class="icon-store"></i> Sell on Martfury?
                <nuxt-link to="/account/register">
                    <a> Register Now !</a>
                </nuxt-link>
            </p>
        </aside>
        <aside class="widget widget_ads">
            <nuxt-link to="/shop">
                <a>
                    <img
                        src="~/static/img/ads/product-ads.png"
                        alt="martfury"
                    />
                </a>
            </nuxt-link>
        </aside>
        <aside class="widget widget_same-brand">
            <h3>Same Brand</h3>
            <div class="widget__content">
                <product-default
                    v-for="product in products"
                    :product="product"
                    :key="product.id"
                />
            </div>
        </aside>
    </section>
</template>

<script>
import { mapState } from 'vuex';
import { getColletionBySlug } from '~/utilities/product-helper';
import ProductDefault from '~/components/elements/product/ProductDefault';

export default {
    name: 'ProductWidgets',
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
