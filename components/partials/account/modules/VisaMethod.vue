<template lang="html">
<div>
    <form id="payment-form">
        <div id="card-container"></div>
        <div class="form-group">
            <p>
                By making this purchase you agree to
                <a href="#" class="highlight">our terms and conditions</a>.
            </p>
            <button class="ps-btn ps-btn--fullwidth"
                @click.prevent="handlePayment"
                id="card-button"
                type="button"
            >
                <p v-if="!loading" class="btn-pagar">Pagar</p>
                <p v-else>...</p>
            </button>

        </div>
    </form>
    <div id="payment-status-container"></div>

</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState } from 'vuex';
import ProductRepository from '~/repositories/ProductoRepository'; 

export default {
    name: 'VisaMethod',
    data: () => ({
        card: null,
        loading: false,
        resumen: '',
        productMail: '',
        productosFinalesHtml: '',
    }),
    computed: {
        cart(){
            return this.$cookies.get('cart')
        },
        cookie(){
            const cookieInfo = this.$cookies.get('shippingInfo', { parseJSON: true });
            return cookieInfo;
        },
        email(){
            return this.cookie.email
        },
        customerId(){
            return this.$cookies.get('auth').user.customer_id;
        },
        user(){
            return this.$cookies.get('auth').user;
        },
        fullName(){
            const name = this.cookie.name + " " + this.cookie.lastName;
            return name;
        },
        token(){
            const token = this.$cookies.get('auth').jwt;
            return token
        }
    },
    mounted: async function() {
        const payments = Square.payments(process.env.SQUARE_APPLICATION_ID, process.env.SQUARE_LOCATION_ID);
        const card = await payments.card();
        await card.attach('#card-container');
        this.card = card;
        console.log(this.cart)
        console.log(this.token)
        this.getProducts(this.cart.cartItems)

    },
    methods: {
        async handlePayment(){
            const cardButton = document.getElementById('card-button');
            cardButton.disabled = true;
            //creando token para la tarjeta
            this.card.tokenize().then(res => {

                if(res.token) {
                    this.loading = true;
                    var token = res.token;
                    var idempotencyKeyGen = uuidv4();
                    var payment = {
                        idempotencyKey: idempotencyKeyGen,
                        locationId: process.env.SQUARE_LOCATION_ID,
                        sourceId: token,
                        customerId: this.customerId,
                        amountMoney: {
                            amount: (parseInt(this.cart.amount) * 100),
                            currency: "USD",
                        },
                        buyerEmailAddress: this.email,
                        shippingAddress: {
                            addressLine1: this.cookie.address,
                            locality: this.cookie.city,
                            postalCode: this.cookie.zipCode,
                            country: 'VE'
                        },
                        note: this.fullName,
                    };
                    this.createPayment(payment)
                }
            }).catch(error => {
                return console.log(error)
            });
        },

        async createPayment(paymentBody){

            const respuesta = await this.$fire.functions.httpsCallable('payment');
            respuesta(paymentBody).then(async (res) => {
                const squareResponse = JSON.parse(res.data);
                const paymentInfo = squareResponse.payment;
                if(paymentInfo.status === 'COMPLETED'){
                    // alert('PAGO REALIZADO')
                    this.$notify({
                        group: 'all',
                        title: 'Exito',
                        text: `El pago se realizado con exito!`
                    });
                    this.loading = false;
                    const itemInvoices = this.cart.cartItems;
                    await this.createInvoice(paymentInfo, itemInvoices).then(respuesta => {
                        console.log(respuesta)
                        if(respuesta.status === 200 && respuesta.statusText == "OK"){
                            // alert('INVOICE CREADO')
                            this.$notify({
                                group: 'all',
                                title: 'Invoice',
                                text: `Su recibo fue creado, puede revisarlo en sus ordenes!`
                            });
                            this.sendInvoiceMail(itemInvoices, paymentInfo);


                        }
                    })
                }
                console.log(squareResponse)
            }).catch(error=>{
                console.log(error)
            })

        },

        async createInvoice(payment, products){
            var setItems = [];
           products.map(function(products){
               setItems.push({
                   id_product: products.id,
                   quantity: products.quantity
               })
           })

            const data = {
                amount: (payment.totalMoney.amount)/100,
                order_id: payment.orderId,
                paid: true,
                payment_id: payment.id,
                products: setItems,
                user_id: this.user.id,
                shippingAddress: payment.shippingAddress,
                fullName: payment.note,
                cardType: payment.cardDetails.card.cardBrand,
                cardKind: payment.cardDetails.card.cardType,
                cardLast: payment.cardDetails.card.last4,

            }

            const payload = {
                token: this.token,
                data: data,
            }
            // console.log('lo que se envia al invoice',data)
           const res = await this.$store.dispatch('checkout/createInvoice', payload).then(res => {
                return res
            }).catch(err => {console.log(err)})

            return res;
        },
        async getProducts(products){
            try {
                var metaData = [];
                products.forEach(element => {
                    metaData.push(element.id)
                });
                console.log('====> meta', metaData)
                var respuesta = await this.$store.dispatch('product/getProductById', metaData ).then(res => {
                    // return console.log('esta es la respuesta',res.data)
                    return respuesta =  res.data;
                }).catch(err=>{
                    return err; 
                })
                this.productMail = respuesta
                return console.log('====> el repo', respuesta)
                
            } catch (error) {
                console.log(error)
            }

        }, 

        async sendInvoiceMail(products, payment){

            try {
                var productos = [];
                var created = new Date(payment.createdAt).toLocaleDateString(); 
                var amountPayed = `$${(parseInt(payment.amountMoney.amount) / 100)} USD`;
                let query = '';
                products.forEach(item => {
                    var finded = this.productMail.find(product => product.id === item.id);
                    if(finded){
                        productos.push({
                            quantity: item.quantity,
                            name: finded.attributes.name,
                            amount: item.price,
                            description: finded.attributes.description
                        });

                        if(query === ''){
                            query = `
                            <tr>
                                <td style="padding:0px 40px 40px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                <div>
                                    <div style="font-family: inherit; text-align: inherit">
                                        <span style="color: #80817f; font-size: 12px">
                                            <strong>Producto:</strong>
                                        </span>
                                        <br>
                                        <p style="font-size: 12px">${finded.attributes.name} x ${item.quantity}</p>
                                        <span style="color: #80817f; font-size: 12px">
                                            <strong>descripcion:</strong>
                                        </span>
                                        <br>
                                        <p style="font-size: 12px">${finded.attributes.description}</p>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            <br>`;
                        }else{
                            query = query + `<tr>
                                <td style="padding:0px 40px 40px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
                                <div>
                                    <div style="font-family: inherit; text-align: inherit">
                                        <span style="color: #80817f; font-size: 12px">
                                            <strong>Producto:</strong>
                                        </span>
                                        <br>
                                        <p style="font-size: 12px">${finded.attributes.name} x ${item.quantity}</p>
                                        <span style="color: #80817f; font-size: 12px">
                                            <strong>descripcion:</strong>
                                        </span>
                                        <br>
                                        <p style="font-size: 12px">${finded.attributes.description}</p>
                                    </div>
                                </div>
                                </td>
                            </tr>
                            <br>`;
                        }
                    
                    };
                });

                console.log('===> pagos', payment)

                this.$axios.$post('/api/sendgrid-mail', {
                    payed: amountPayed,
                    email: payment.buyerEmailAddress,
                    nameCustomer: payment.note,
                    date: created, 
                    content: query,
                    order_id: payment.orderId,
                }).then(async (res) => {console.log('lo de axios ===>',res)
                    if(res.stat && res.stat === 200){
                        this.$notify({
                            group: 'all',
                            title: 'recibo',
                            text: `gracias por preferirnos!`
                        });
                        await new Promise(resolve => setTimeout(resolve, 2000))
                        this.$router.push('/')
                        this.$store.dispatch('cart/clearCart');
                        this.card.clear()
                    }
                }); 
                // alert('se envio el correo')
            } catch (error) {
                console.log('error en el correo')
            }
        }

    }
}

</script>

<style lang="scss" scoped>
.highlight {
    color: $color-1st;
}
.btn-pagar{
    font-weight: 500;
    font-size: 20px;
    padding: 0;
    color: black;
    margin: 0;
}
</style>
