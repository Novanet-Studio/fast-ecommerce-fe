<template lang="html">
<div class="ps-section__content">
    <div class="ps-section--account-setting" >
        <div id="pdf-content">
            <div class="ps-section__header">
                <h3>
                    Factura #{{ invoice.attributes.id_invoice_user }} -
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
                                    {{ invoice.attributes.fullName }}
                                </strong>
                                <p v-if="invoice.shippingAddress">
                                    Dirección: {{ invoice.attributes.shippingAddress.addressLine1 }},
                                    {{ invoice.attributes.shippingAddress.locality }}, {{ invoice.attributes.shippingAddress.country }}
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
                                <p v-if="invoice.attributes.paid === true">
                                    Pagado
                                </p>
                                <p v-else>No pagado</p>
                                <p>
                                    {{ invoice.attributes.date }}
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
                                    Pago: {{ invoice.attributes.cardKind }} {{ invoice.attributes.cardType }},
                                </p>
                                <p>Ultimos Cuatro digitos: {{invoice.attributes.cardLast}}</p>
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
                                    <td>{{product.attributes.name}}</td>
                                    <td class="price">$ {{ product.attributes.price }}</td>
                                    <td>{{invoice.attributes.products[index].quantity}}</td>
                                    <td class="price">$ {{ product.attributes.price }}</td>
                                </tr>
                                <tr>
                                    <td></td>
                                    <td></td>
                                    <td>MONTO TOTAL</td>
                                    <td>${{invoice.attributes.amount}}</td>
    
                                </tr>
                            </tbody>
                        </table>

                </div>
            </div>
        </div>
            <nuxt-link to="/account/invoices">
                <a class="ps-btn ps-btn--sm ">
                    regresar
                </a>
            </nuxt-link>
            <button @click="pdf()" class="ps-btn ps-btn--sm ">PDF</button>
    </div>

</div>
</template>

<script>
import jsPDF from 'jspdf';
import html2PDF from 'jspdf-html2canvas';

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
        this.getIdProducts(this.invoice.attributes.products)
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
            // return console.log(ids_p)
            try {
                var respuesta = await this.$store.dispatch('product/getProductById', ids_p ).then(res => {
                    // return console.log('esta es la respuesta',res.data)
                    return respuesta =  res.data;
                }).catch(err=>{
                    return err; 
                })
                return respuesta
                
            } catch (error) {
                console.log(error)
            }
        },
        pdf(){
            var elementHTML = document.getElementById('pdf-content')
            var name = this.invoice.attributes.id_invoice_user;
            html2PDF(elementHTML, {
                jsPDF: {
                format: 'a4',
                },
                imageType: 'image/jpeg',
                output: `factura-${name}`,
                margin: {
                    top: 20,
                    right: 10,
                    bottom: 20,
                    left: 10,
                } 
            });
        }

    }
};
</script>

<style lang="scss" scoped></style>
