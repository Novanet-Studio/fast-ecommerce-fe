<template lang="html">
    <table class="table ps-table--shopping-cart">
        <thead>
            <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Amount</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="product in products" :key="product.id">
                <td>
                    <ProductCart :product="product" />
                </td>
                <td class="price">$ {{ product.price }}</td>
                <td>1</td>
                <td class="price">$ {{ product.price }}</td>
            </tr>
        </tbody>
    </table>
</template>

<script>
import ProductCart from '~/components/elements/product/ProductCart';
export default {
    name: 'TableInvoice',
    components: { ProductCart },
    props: {
        products: {
            type: Array,
            default: []
        }
    }
};
</script>

<style lang="scss" scoped></style>
