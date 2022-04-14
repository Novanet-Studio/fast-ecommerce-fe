<template lang="html">
<div class="ps-section__content">
    <div class="ps-section--account-setting">
        <div class="ps-section__header">
            <h3>
                Factura #{{ invoice.id_invoice_user }} -
                <strong>Successful delivery PPU</strong>
            </h3>
        </div>
        <div class="ps-section__content">
            <div class="row">
                <div class="col-md-4 col-12">
                    <figure class="ps-block--invoice">
                        <figcaption>
                            Address
                        </figcaption>
                        <div class="ps-block__content">
                            <strong>
                                {{ invoice.fullName }}
                            </strong>
                            <p>
                                Dirección: {{ invoice.shippingAddress.addressLine1 }},
                                {{ invoice.shippingAddress.locality }}, {{ invoice.shippingAddress.country }}
                            </p>
                            <p>
                                Phone: 913-489-1853
                            </p>
                        </div>
                    </figure>
                </div>
                <div class="col-md-4 col-12">
                    <figure class="ps-block--invoice">
                        <figcaption>
                            Shipping Fee
                        </figcaption>
                        <div class="ps-block__content">
                            <p>
                                Shipping Fee: Free
                            </p>
                        </div>
                    </figure>
                </div>
                <div class="col-md-4 col-12">
                    <figure class="ps-block--invoice">
                        <figcaption>
                            Payment
                        </figcaption>
                        <div class="ps-block__content">
                            <p>
                                Payment Method: Visa
                            </p>
                        </div>
                    </figure>
                </div>
            </div>
            <div class="table-responsive">
                <!-- <TableInvoice :products="invoiceProducts" /> -->
            </div>
            <nuxt-link to="/account/invoices">
                <a class="ps-btn ps-btn--sm ">
                    Back to invoices
                </a>
            </nuxt-link>
        </div>
    </div>
</div>
</template>

<script>
import TableInvoice from './modules/TableInvoice';
export default {
    name: 'InvoiceDetail',
    components: { TableInvoice },
    // data() {
    //     return {
    //         // invoiceProducts: [
    //         //     {
    //         //         id: '6',
    //         //         thumbnail: '/img/products/shop/5.jpg',
    //         //         title: 'Grand Slam Indoor Of Show Jumping Novel',
    //         //         vendor: "Robert's Store",
    //         //         sale: true,
    //         //         price: '32.99',
    //         //         sale_price: '41.00',
    //         //         rating: true,
    //         //         ratingCount: '4',
    //         //         badge: [
    //         //             {
    //         //                 type: 'sale',
    //         //                 value: '-37%'
    //         //             }
    //         //         ]
    //         //     },

    //         // ]
    //     };
    // },
    computed: {
        invoice(){
            return this.$cookies.get('invoice').invoice
        },
        user(){
            return this.$cookies.get('auth').user
        }
    },
    mounted(){
        console.log(this.invoice)
        console.log('hola')
        // this.getProductsInvoice(this.invoice)
    },
    methods: {
        async getProductsInvoice(id){

            // const respuesta = await this.$store.dispatch('product/getProductById')
        }
    }
};
</script>

<style lang="scss" scoped></style>
