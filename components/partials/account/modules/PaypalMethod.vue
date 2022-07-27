<template lang="html">
    <div ref="paypal" id="paypal-contenedor">

    </div>
</template>

<script>
import { v4 as uuidv4 } from "uuid";

export default {
    name: 'PaypalMethod',
    data(){
        return {
            loaded: false,
            paidFor: false, 
            productsCart: "", 
            resumen: "",
            productMail: "",
            productosFinalesHtml: "",
            invoice_id: '',
        }
    },
    computed: {
        cart() {
            return this.$cookies.get("cart");
        },
        cookie() {
            const cookieInfo = this.$cookies.get("shippingInfo", { parseJSON: true });
            return cookieInfo;
        },
        email() {
            return this.cookie.email;
        },
        customerId() {
            return this.$cookies.get("auth").user.customer_id;
        },
        user() {
            return this.$cookies.get("auth").user;
        },
        fullName() {
            const name = this.cookie.name + " " + this.cookie.lastName;
            return name;
        },
        token() {
            const token = this.$cookies.get("auth").jwt;
            return token;
        },
    },
    mounted: async function() {
        await this.getProducts(this.cart.cartItems); 
        this.invoice_id = this.getInvoiceId()
        const clientId = process.env.PAYPAL_CLIENT_ID; 
        console.log('====> ', clientId)
        const script = document.createElement("script");
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&disable-funding=credit,card`;
        script.addEventListener('load', this.setLoaded);
        document.body.appendChild(script)
        console.log('el invoice id',this.invoice_id)
    },
    methods:{
        setLoaded(){
            console.log('===>', this.cart, this.cookie, this.customerId)
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: 'Compra desde la app',
                                amount: {
                                    currency_code: 'USD',
                                    value: parseInt(this.cart.amount)
                                },
                                shipping: {
                                    address: {
                                        address_line_1: this.cookie.address,
                                        admin_area_1: this.cookie.home,
                                        admin_area_2: this.cookie.city,
                                        country_code: "VE",
                                        postal_code: this.cookie.zipCode,
                                    }
                                },
                                invoice_id: this.invoice_id,
                            }
                        ]
                    })
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture().then(async(res) => {
                        const contenedor = document.getElementById('paypal-contenedor')
                        contenedor.innerHTML = '';
                        contenedor.innerHTML = "<h4 class='text-center'>Por favor espere!</h4>";

                        console.log('dentro del then ====> ', res)
                        if(res.status === 'COMPLETED'){
                            const itemInvoices = this.cart.cartItems;
                            this.$notify({
                                group: "all",
                                title: "Exito",
                                text: `El pago se realizado con exito!`,
                            });
                            await this.createInvoice(res, itemInvoices ).then((respuesta)=> {
                                console.log('===> respuesta del invoice', respuesta)
                                if (respuesta.status === 200 && respuesta.statusText == "OK") {
                                    // alert('INVOICE CREADO')
                                    this.$notify({
                                        group: "all",
                                        title: "Invoice",
                                        text: `Su recibo fue creado, puede revisarlo en sus ordenes!`,
                                    });
                                    this.sendInvoiceMail(this.cart.cartItems, res);
                                }
                            })
                        }
                    });
                },
                onError: (data, actions)=>{
                    this.$notify({
                        group: "all",
                        title: "Pagos paypal",
                        text: `Hubo un error, no se puede procesar el pago en estos momentos!`,
                    });
                },

            }).render(this.$refs.paypal)
        },
        async createInvoice(payment, products) {
            var productName = this.productsCart;
            var setItems = [];
            products.map(async function (products) {
                var finded = productName.find(item => item.id === products.id)
                if(finded){
                setItems.push({
                    id_product: products.id,
                    quantity: products.quantity,
                    name_product: finded.attributes.name
                });
                }
            });

            console.log('====> estp',setItems)            
            var setAddress = {
                phone: this.cookie.phone,
                home: this.cookie.home,
                country: payment.purchase_units[0].shipping.address.country_code,
                locality: payment.purchase_units[0].shipping.address.admin_area_2, 
                postalCode: payment.purchase_units[0].shipping.address.postal_code,
                AddressLine1: payment.purchase_units[0].shipping.address.address_line_1
            }

            const paymentInf = {
                nombre: payment.payer.name.given_name,
                apellido: payment.payer.name.surname,
                email: payment.payer.email_address,
                confirmacion: payment.id,
                monto: payment.purchase_units[0].amount.value,
                fecha_pago: payment.create_time
            }

            const data = {
                amount: payment.purchase_units[0].amount.value,
                order_id: payment.purchase_units[0].invoice_id,
                paid: true,
                payment_id: payment.id,
                products: setItems,
                user_id: this.user.id,
                shippingAddress: setAddress,
                fullName: this.fullName,
                cardType: 'no aplica',
                cardKind: 'no aplica',
                cardLast: 'no aplica',
                payment_info: [paymentInf],
                payment_method: 'paypal'
            };


            const payload = {
                token: this.token,
                data: data,
            };

            // return payload
            console.log('lo que se envia al invoice',data)
            const res = await this.$store
                .dispatch("checkout/createInvoice", payload)
                .then((res) => {
                return res;
                })
                .catch((err) => {
                console.log(err);
                });

            return res;
        },
        async getProducts(products) {
            try {
                var metaData = [];
                products.forEach((element) => {
                metaData.push(element.id);
                });
                console.log("====> meta", metaData);
                var respuesta = await this.$store
                .dispatch("product/getProductById", metaData)
                .then((res) => {
                    // return console.log('esta es la respuesta',res.data)
                    return (respuesta = res.data);
                })
                .catch((err) => {
                    return err;
                });
                this.productMail = respuesta;
                this.productsCart = respuesta; 
                return console.log("====> el repo", respuesta, this.productMail, this.productsCart);
            } catch (error) {
                console.log(error);
            }
        },
        getInvoiceId() {
            let a = new Uint32Array(3);
            window.crypto.getRandomValues(a);
            return (performance.now().toString(36)+Array.from(a).map(A => A.toString(36)).join("")).replace(/\./g,"");
            
        },
        async sendInvoiceMail(products, payment) {
            try {
                var productos = [];
                var created = new Date(payment.create_time).toLocaleDateString();
                var amountPayed = `$${parseInt(payment.purchase_units[0].amount.value)} USD`;
                let query = "";
                // products.forEach((item) => {
                // var finded = this.productMail.find(
                //     (product) => product.id === item.id
                // );
                // if (finded) {
                //     productos.push({
                //     quantity: item.quantity,
                //     name: finded.attributes.name,
                //     amount: item.price,
                //     description: finded.attributes.description,
                //     });
                // }
                // });
                for(let item of products){
                    var finded = this.productMail.find(
                        (product) => product.id === item.id
                    );
                    if (finded) {
                        console.log(finded)
                        productos.push({
                            quantity: item.quantity,
                            name: finded.attributes.name,
                            amount: item.price,
                            description: finded.attributes.description,
                        });
                        var payload = {
                            quantity: item.quantity,
                            name: finded.attributes.name,
                            price: item.price,
                        }
                        var queryResponse = await this.$store.dispatch('checkout/productsMailQuery',payload ).then(res => {return res});

                        if(query === ""){
                            query = queryResponse; 
                        }else{
                            query = query + queryResponse; 
                        }
                    }
                }

                console.log("===> pagos", payment);
                const dataSgmail = {
                    apikey: process.env.SENDGRID_API_KEY,
                    senderMail: process.env.SENDGRID_SENDER_MAIL,
                    receiverMail: process.env.SENDGRID_ORDER_RECEIVER_MAIL,
                }
                const merchant = {
                    payed: amountPayed,
                    email: this.email,
                    phone: this.cookie.phone,
                    shipping: `${payment.purchase_units[0].shipping.address.address_line_1}, ${this.cookie.home}, ${payment.purchase_units[0].shipping.address.admin_area_2}. Zip Code: ${payment.purchase_units[0].shipping.address.postal_code}. ${payment.purchase_units[0].shipping.address.country_code}`,
                    nameCustomer: this.fullName,
                    date: created,
                    content: query,
                    order_id: this.invoice_id,
                    dataSgmail: dataSgmail
                }

                this.$axios
                .$post("https://us-central1-farine-square-service.cloudfunctions.net/sendRecip", {
                    payed: amountPayed,
                    email: this.email,
                    nameCustomer: this.fullName,
                    date: created,
                    content: query,
                    order_id: this.invoice_id,
                    dataSgmail: dataSgmail

                })
                .then(async (res) => {
                    console.log("lo de axios ===>", res);
                        if (res.stat && res.stat === 200) {
                            await this.sendMerchantMail(merchant)
                        }
                });
                // alert('se envio el correo')
            } catch (error) {
                console.log("error en el correo");
            }
        },
        async sendMerchantMail(data){
            try {
                console.log(data)
                this.$axios
                .$post("https://us-central1-farine-square-service.cloudfunctions.net/sendMerchant", data)
                .then(async (res) => {
                    console.log("lo de axios DOS ===>", res);
                    if (res.stat && res.stat === 200) {
                        this.$notify({
                            group: "all",
                            title: "recibo",
                            text: `gracias por preferirnos!`,
                        });
                        await new Promise((resolve) => setTimeout(resolve, 2000));
                        this.$router.push("/");
                        this.$store.dispatch("cart/clearCart");
                    }
                });
            } catch (error) {
                console.log('error enviando correo marchatn', error)
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.highlight {
    color: $color-1st;
}
#paypal {
    max-width: 500px;
}
</style>
