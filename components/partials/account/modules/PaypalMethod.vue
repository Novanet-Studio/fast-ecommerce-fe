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
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
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
                products.forEach((item) => {
                var finded = this.productMail.find(
                    (product) => product.id === item.id
                );
                if (finded) {
                    productos.push({
                    quantity: item.quantity,
                    name: finded.attributes.name,
                    amount: item.price,
                    description: finded.attributes.description,
                    });

                    if (query === "") {
                    query = `
                                    <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="center"
        width="100%"
        role="module"
        data-type="columns"
        style="padding: 0px 40px 0px 40px"
        bgcolor="#FFFFFF"
        data-distribution="1,1,1"
        >
        <tbody>
            <tr role="module-content">
            <td height="100%" valign="top">
                <table
                width="173"
                style="
                    width: 173px;
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin: 0px 0px 0px 0px;
                "
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-0"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px; margin: 0px; border-spacing: 0">
                        <table
                        class="module"
                        role="module"
                        data-type="text"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="table-layout: fixed"
                        data-muid="64573b96-209a-4822-93ec-5c5c732af15c.2"
                        data-mc-module-version="2019-10-22"
                        >
                        <tbody>
                            <tr>
                            <td
                                style="
                                padding: 15px 0px 15px 0px;
                                line-height: 22px;
                                text-align: inherit;
                                "
                                height="100%"
                                valign="top"
                                bgcolor=""
                                role="module-content"
                            >
                                <div>
                                <div style="font-family: inherit; text-align: center">
                                    <span style="color: #80817f; font-size: 12px"
                                    >${finded.attributes.name}
                                    </span>
                                </div>
                                <div></div>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
                <table
                width="173"
                style="
                    width: 173px;
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin: 0px 0px 0px 0px;
                "
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-1"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px; margin: 0px; border-spacing: 0">
                        <table
                        class="module"
                        role="module"
                        data-type="text"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="table-layout: fixed"
                        data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.2"
                        data-mc-module-version="2019-10-22"
                        >
                        <tbody>
                            <tr>
                            <td
                                style="
                                padding: 15px 0px 15px 0px;
                                line-height: 22px;
                                text-align: inherit;
                                "
                                height="100%"
                                valign="top"
                                bgcolor=""
                                role="module-content"
                            >
                                <div>
                                <div style="font-family: inherit; text-align: center">
                                    <span style="color: #80817f; font-size: 12px"
                                    >${item.quantity}</span
                                    >
                                </div>
                                <div></div>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
                <table
                width="173"
                style="
                    width: 173px;
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin: 0px 0px 0px 0px;
                "
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-2"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px; margin: 0px; border-spacing: 0">
                        <table
                        class="module"
                        role="module"
                        data-type="text"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="table-layout: fixed"
                        data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.1.1"
                        data-mc-module-version="2019-10-22"
                        >
                        <tbody>
                            <tr>
                            <td
                                style="
                                padding: 15px 0px 15px 0px;
                                line-height: 22px;
                                text-align: inherit;
                                "
                                height="100%"
                                valign="top"
                                bgcolor=""
                                role="module-content"
                            >
                                <div>
                                <div style="font-family: inherit; text-align: center">
                                    <span style="color: #80817f; font-size: 12px"
                                    >$&nbsp;${item.price}</span
                                    >
                                </div>
                                <div></div>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
        </table>
        <table
        class="module"
        role="module"
        data-type="divider"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="table-layout: fixed"
        data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1.2"
        >
        <tbody>
            <tr>
            <td
                style="padding: 0px 40px 0px 40px"
                role="module-content"
                height="100%"
                valign="top"
                bgcolor=""
            >
                <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                width="100%"
                height="1px"
                style="line-height: 1px; font-size: 1px"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px 0px 1px 0px" bgcolor="#80817f"></td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
        </table>

                                    `;
                    } else {
                    query =
                        query +
                        `
                                    <table
        border="0"
        cellpadding="0"
        cellspacing="0"
        align="center"
        width="100%"
        role="module"
        data-type="columns"
        style="padding: 0px 40px 0px 40px"
        bgcolor="#FFFFFF"
        data-distribution="1,1,1"
        >
        <tbody>
            <tr role="module-content">
            <td height="100%" valign="top">
                <table
                width="173"
                style="
                    width: 173px;
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin: 0px 0px 0px 0px;
                "
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-0"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px; margin: 0px; border-spacing: 0">
                        <table
                        class="module"
                        role="module"
                        data-type="text"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="table-layout: fixed"
                        data-muid="64573b96-209a-4822-93ec-5c5c732af15c.2"
                        data-mc-module-version="2019-10-22"
                        >
                        <tbody>
                            <tr>
                            <td
                                style="
                                padding: 15px 0px 15px 0px;
                                line-height: 22px;
                                text-align: inherit;
                                "
                                height="100%"
                                valign="top"
                                bgcolor=""
                                role="module-content"
                            >
                                <div>
                                <div style="font-family: inherit; text-align: center">
                                    <span style="color: #80817f; font-size: 12px"
                                    >${finded.attributes.name}
                                    </span>
                                </div>
                                <div></div>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
                <table
                width="173"
                style="
                    width: 173px;
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin: 0px 0px 0px 0px;
                "
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-1"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px; margin: 0px; border-spacing: 0">
                        <table
                        class="module"
                        role="module"
                        data-type="text"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="table-layout: fixed"
                        data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.2"
                        data-mc-module-version="2019-10-22"
                        >
                        <tbody>
                            <tr>
                            <td
                                style="
                                padding: 15px 0px 15px 0px;
                                line-height: 22px;
                                text-align: inherit;
                                "
                                height="100%"
                                valign="top"
                                bgcolor=""
                                role="module-content"
                            >
                                <div>
                                <div style="font-family: inherit; text-align: center">
                                    <span style="color: #80817f; font-size: 12px"
                                    >${item.quantity}</span
                                    >
                                </div>
                                <div></div>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
                <table
                width="173"
                style="
                    width: 173px;
                    border-spacing: 0;
                    border-collapse: collapse;
                    margin: 0px 0px 0px 0px;
                "
                cellpadding="0"
                cellspacing="0"
                align="left"
                border="0"
                bgcolor=""
                class="column column-2"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px; margin: 0px; border-spacing: 0">
                        <table
                        class="module"
                        role="module"
                        data-type="text"
                        border="0"
                        cellpadding="0"
                        cellspacing="0"
                        width="100%"
                        style="table-layout: fixed"
                        data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.1.1"
                        data-mc-module-version="2019-10-22"
                        >
                        <tbody>
                            <tr>
                            <td
                                style="
                                padding: 15px 0px 15px 0px;
                                line-height: 22px;
                                text-align: inherit;
                                "
                                height="100%"
                                valign="top"
                                bgcolor=""
                                role="module-content"
                            >
                                <div>
                                <div style="font-family: inherit; text-align: center">
                                    <span style="color: #80817f; font-size: 12px"
                                    >$&nbsp;${item.price}</span
                                    >
                                </div>
                                <div></div>
                                </div>
                            </td>
                            </tr>
                        </tbody>
                        </table>
                    </td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
        </table>
        <table
        class="module"
        role="module"
        data-type="divider"
        border="0"
        cellpadding="0"
        cellspacing="0"
        width="100%"
        style="table-layout: fixed"
        data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1.2"
        >
        <tbody>
            <tr>
            <td
                style="padding: 0px 40px 0px 40px"
                role="module-content"
                height="100%"
                valign="top"
                bgcolor=""
            >
                <table
                border="0"
                cellpadding="0"
                cellspacing="0"
                align="center"
                width="100%"
                height="1px"
                style="line-height: 1px; font-size: 1px"
                >
                <tbody>
                    <tr>
                    <td style="padding: 0px 0px 1px 0px" bgcolor="#80817f"></td>
                    </tr>
                </tbody>
                </table>
            </td>
            </tr>
        </tbody>
        </table>

                                    `;
                    }
                }
                });

                console.log("===> pagos", payment);

                const merchant = {
                    payed: amountPayed,
                    email: this.email,
                    phone: this.cookie.phone,
                    shipping: `${payment.purchase_units[0].shipping.address.address_line_1}, ${this.cookie.home}, ${payment.purchase_units[0].shipping.address.admin_area_2}. Zip Code: ${payment.purchase_units[0].shipping.address.postal_code}. ${payment.purchase_units[0].shipping.address.country_code}`,
                    nameCustomer: this.fullName,
                    date: created,
                    content: query,
                    order_id: this.invoice_id,
                }

                this.$axios
                .$post("/api/sendgrid-mail", {
                    payed: amountPayed,
                    email: this.email,
                    nameCustomer: this.fullName,
                    date: created,
                    content: query,
                    order_id: this.invoice_id,
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
                .$post("/api/sendgrid-mail/merchant", data)
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
