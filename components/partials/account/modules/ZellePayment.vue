<template>
    <div class="pagoMovil--contenedor">
        <div v-if="payment_merchant_info" class="ps-block__content">
            <strong>Zelle Datos</strong>
            <figure class="ps-block__items">
                Nombre: {{ payment_merchant_info.attributes.nombre  }}.
                <br>
                Numero de telefono: {{ payment_merchant_info.attributes.telefono }}.
                <br>
                correo: {{ payment_merchant_info.attributes.correo  }}
                <br>
                motivo: {{ payment_merchant_info.attributes.concepto_pago  }}
            </figure>
            <figure>
                <figcaption>
                    <strong>Subtotal</strong>
                    <small>$ {{ amount }}</small>
                </figcaption>
            </figure>
        </div>
        <div v-else class="ps-block__content">
            <strong>No disponemos de este metodo actualmente, elige otro por favor!</strong>
        </div>
       <form id="zelle-form">
            <div class="form-group">
                <label> Nombre del titular de la cuenta <sup>*</sup> </label>
                <v-text-field
                    v-model="name"
                    placeholder="Nombre del titular de la cuenta"
                    :error-messages="nameErrors"
                    @input="$v.name.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Apellido del titular de la cuenta <sup>*</sup> </label>
                <v-text-field
                    v-model="lastName"
                    placeholder="Apellido del titular de la cuenta"
                    :error-messages="lastNameErrors"
                    @input="$v.lastName.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Numero de confirmacion <sup>*</sup> </label>
                <v-text-field
                    v-model="confirmation"
                    placeholder="numero de confirmacion"
                    :error-messages="confirmationErrors"
                    @input="$v.confirmation.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Monto del pago en $USD<sup>*</sup> </label>
                <v-text-field
                    v-model="amountPayed"
                    placeholder="Monto del pago"
                    type="number"
                    :error-messages="amountPayedErrors"
                    @input="$v.amountPayed.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <label> Fecha del pago <sup>*</sup> </label>
                <v-text-field
                    v-model="date"
                    type="date"
                    placeholder="Fecha del pago"
                    :error-messages="dateErrors"
                    @input="$v.date.$touch()"
                    height="50"
                    class="input-farine"
                />
            </div>
            <div class="form-group">
                <p>
                    By making this purchase you agree to
                    <a href="#" class="highlight">our terms and conditions</a>.
                </p>
                <button class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handleZelle"
                    id="card-button"
                    type="button"
                >
                    <p v-if="!loading" class="btn-pagar">Enviar Datos</p>
                    <p v-else>...</p>
                </button>

            </div>
       </form>
    </div>
</template>

<script>
import { email, required } from 'vuelidate/lib/validators';
import { validationMixin } from 'vuelidate';

    export default {
        name: 'ZellePayment',
        data(){
            return {
                name: null, 
                lastName: null, 
                amountPayed: null, 
                confirmation: null,
                date: null,  
                loading: false, 
                invoice_id: '', 
                productMail: "",
                productosFinalesHtml: "",
                productsCart: "", 
                payment_merchant_info: null,

            }
        }, 
        computed: {
            amount(){
                let amount = (parseInt(this.$cookies.get('cart').amount))
                return amount
            },
            nameErrors(){
                const errors = [];
                if(!this.name){
                    if (!this.$v.name.$dirty) return errors;
                    !this.$v.name.required && errors.push('This field is required');
                    return errors;
                }
            },
            lastNameErrors(){
                const errors = [];
                if(!this.lastName){
                    if (!this.$v.lastName.$dirty) return errors;
                    !this.$v.lastName.required && errors.push('This field is required');
                    return errors;
                }
            },
            confirmationErrors(){
                const errors = [];
                if(!this.confirmation){
                    if (!this.$v.confirmation.$dirty) return errors;
                    !this.$v.confirmation.required && errors.push('This field is required');
                    return errors;
                }
            },
            dateErrors(){
                const errors = [];
                if(!this.date){
                    if (!this.$v.date.$dirty) return errors;
                    !this.$v.date.required && errors.push('This field is required');
                    return errors;
                }
            },
            amountPayedErrors(){
                const errors = [];
                if(!this.amountPayed){
                    if (!this.$v.amountPayed.$dirty) return errors;
                    !this.$v.amountPayed.required && errors.push('This field is required');
                    return errors;
                }
            },
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
        validations: {
            name: {required},
            lastName: { required }, 
            confirmation: { required }, 
            date: { required },
            amountPayed: {required}
        },
        mounted: async function(){
            await this.getPaymentInfo()
            await this.getProducts(this.cart.cartItems); 
            this.invoice_id = this.getInvoiceId(); 
        },
        methods: {
            getInvoiceId() {
                let a = new Uint32Array(3);
                window.crypto.getRandomValues(a);
                return (performance.now().toString(36)+Array.from(a).map(A => A.toString(36)).join("")).replace(/\./g,"");
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
            async handleZelle(){
                this.$v.$touch();
                if (!this.$v.$invalid) {

                    this.loading = true; 
                    var current_date = new Date(); 

                    if((this.amountPayed === this.cart.amount) && (Date.parse(this.date) <= Date.parse(current_date))){
                        var dataPayment = {
                            nombre: this.name,
                            apellido: this.lastName, 
                            numero_confirmacion: this.confirmation, 
                            monto: this.amountPayed,
                            fecha: this.date, 
                        }  
                        console.log('data que se debe setar al invoice===>',dataPayment, this.cart, )
                        //** PRIMERO ENVIAR A STRAPI*/
                        await this.createInvoice(dataPayment, this.cart.cartItems).then(async (respuesta) => {
                            console.log('la respuesta del invoice', respuesta)
                            if(respuesta.status === 200 && respuesta.statusText == "OK"){
                                this.$notify({
                                    group: "all",
                                    title: "Exito",
                                    text: `la orden se ha generado, se encuentra pendiente en aprobacion!`,
                                });
                                this.sendInvoiceMail(this.cart.cartItems, dataPayment);
                            }
                        })
                    }else{
                        this.$notify({
                            group: "all",
                            title: "error",
                            text: `el monto o la fecha del pago no son permitidos!`,
                        });
                        this.loading = false;
                    }
                }

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
                    country: this.cookie.country,
                    locality: this.cookie.city, 
                    postalCode: this.cookie.zipCode,
                    AddressLine1: this.cookie.address,
                }

                const paymentInfo = {
                    nombre: payment.nombre,
                    apellido: payment.apellido,
                    email: this.email,
                    confirmacion: payment.numero_confirmacion,
                    monto: payment.monto,
                    fecha_pago: payment.fecha
                }

                const data = {
                    amount: payment.monto,
                    order_id: this.invoice_id,
                    paid: false,
                    payment_id: payment.numero_confirmacion,
                    products: setItems,
                    user_id: this.user.id,
                    shippingAddress: setAddress,
                    fullName: this.fullName,
                    cardType: 'no aplica',
                    cardKind: 'no aplica',
                    cardLast: 'no aplica',
                    payment_info: [paymentInfo],
                    payment_method: 'zelle'
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
            async sendInvoiceMail(products, payment) {
                try {
                    var productos = [];
                    var created = new Date(payment.fecha).toLocaleDateString();
                    var amountPayed = `$${parseInt(payment.monto)} USD`;
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
                        shipping: `${this.cookie.address} ${this.cookie.home}, ${this.cookie.city}. Zip Code: ${this.cookie.zipCode}. ${this.cookie.country}`,
                        nameCustomer: this.fullName,
                        date: created,
                        content: query,
                        order_id: `${this.invoice_id} (PENDIENTE EN APROBACION)`,
                    }

                    this.$axios
                    .$post("/api/sendgrid-mail", {
                        payed: amountPayed,
                        email: this.email,
                        nameCustomer: this.fullName,
                        date: created,
                        content: query,
                        order_id: `${this.invoice_id} (PENDIENTE EN APROBACION)`,
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
            },
            async getPaymentInfo(){
                const tipo = 'zelle'
                const response = await this.$store.dispatch('checkout/paymentInfo', tipo).then( res => {
                    if(res.id){
                        console.log('====> estoooo payment', res)
                        this.payment_merchant_info = res; 
                    }
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.pagoMovil--contenedor{
    .ps-block__content{
        strong{
            color: #e36d65;
        }
    }

}
</style>