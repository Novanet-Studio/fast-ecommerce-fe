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
                            <p v-if="invoice.shippingAddress">
                                Dirección: {{ invoice.shippingAddress.addressLine1 }},
                                {{ invoice.shippingAddress.locality }}, {{ invoice.shippingAddress.country }}
                            </p>
                            <p>
                                {{ invoice.date }}
                            </p>
                        </div>
                    </figure>
                </div>
                <div class="col-md-4 col-12">
                    <figure class="ps-block--invoice">
                        <figcaption>
                            Estado
                        </figcaption>
                        <div class="ps-block__content">
                            <p v-if="invoice.paid === true">
                                Pagado
                            </p>
                            <p v-else>No pagado</p>
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
                    <table class="table ps-table--shopping-cart">
                        <thead>
                            <tr>
                                <th>Productos</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Monto</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="product, index in products" :key="product.id">
                                <td>{{product.name}}</td>
                                <td class="price">$ {{ product.price }}</td>
                                <td>{{invoice.products[index].quantity}}</td>
                                <td class="price">$ {{ product.price }}</td>
                            </tr>
                            <tr>
                                <td></td>
                                <td></td>
                                <td>MONTO TOTAL</td>
                                <td>${{invoice.amount}}</td>
   
                            </tr>
                        </tbody>
                    </table>

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
export default {
    name: 'InvoiceDetail',
    data(){
        return{
            products: ''
        }
    },
    computed: {
        invoice(){
            return this.$cookies.get('invoice').invoice
        },
        user(){
            return this.$cookies.get('auth').user
        },
    },
    mounted(){
        console.log(this.invoice)
        console.log('hola')
        this.getIdProducts(this.invoice.products)
        console.log(this.products)
    },
    methods: {
        async getIdProducts(products){
            var productsIds = [ ];
            for (let i = 0; i < products.length; i++) {
                productsIds.push(products[i].id_product)
            }

           this.products =  await this.getProductsInvoice(productsIds);

           console.log(this.products)

        },
        async getProductsInvoice(ids_p){
            try {
                var respuesta = await this.$store.dispatch('product/getProductById', ids_p ).then(res => {
                    return respuesta =  res;
                }).catch(err=>{
                    return err; 
                })
                return respuesta
                
            } catch (error) {
                console.log(error)
            }
        }
    }
};
</script>

<style lang="scss" scoped></style>
