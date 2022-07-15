<template>
    <div class="pagoMovil--contenedor">
        <div v-if="payment_merchant_info" class="ps-block__content">
            <strong>Datos de pago</strong>
            <figure class="ps-block__items">
                Nombre: {{ payment_merchant_info.attributes.nombre  }}.
                <br>
                Numero de telefono: {{ payment_merchant_info.attributes.telefono }}.
                <br>
                banco: {{ payment_merchant_info.attributes.nombre_banco  }}
                <br>
                rif: {{ payment_merchant_info.attributes.codigo_unico  }}
                <br>
                motivo: {{ payment_merchant_info.attributes.concepto_pago  }}
            </figure>
            <figure>
                <figcaption>
                    <strong>Subtotal en Bs</strong>
                    <small>{{ amountRate }}</small>
                </figcaption>
            </figure>
        </div>
        <div v-else class="ps-block__content">
            <strong>No disponemos de este metodo actualmente, elige otro por favor!</strong>
        </div>
       <form id="pagomovil-form">
            <div class="form-group">
                <label> Nombre titular de la cuenta <sup>*</sup> </label>
                <v-text-field
                    v-model="name"
                    placeholder="Nombre titular de la cuenta"
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
                <label> Monto del pago en Bs<sup>*</sup> </label>
                 <p>
                    <b>La tasa del día BCV es de {{ rateBs }} BsD. El monto del pago debe ser de {{ amountRate }}</b>
                </p>
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
                <p>
                    By making this purchase you agree to
                    <a href="#" class="highlight">our terms and conditions</a>.
                </p>
                <button class="ps-btn ps-btn--fullwidth"
                    @click.prevent="handlePagoMovil"
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
        name: 'PagoMovil',
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
                rateBs: null

            }
        }, 
        computed: {

            amountRate(){
                let amount = (this.rateBs * parseInt(this.$cookies.get('cart').amount))
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
            confirmationErrors(){
                const errors = [];
                if(!this.confirmation){
                    if (!this.$v.confirmation.$dirty) return errors;
                    !this.$v.confirmation.required && errors.push('This field is required');
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
            date: { required },
            amountPayed: { required }, 
            confirmation: { required },
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
            async handlePagoMovil(){
                this.$v.$touch();
                if (!this.$v.$invalid) {
                    this.loading = true; 
                    var current_date = new Date(); 

                    if((Date.parse(this.date) <= Date.parse(current_date))){
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
                            group: 'all',
                            title: 'Error!',
                            text: `El monto del pago debe ser de ${this.amountRate} y la fecha debe concordar con el dia de hoy!`
                        });
                        this.loading = false
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
                    amount: (payment.monto / this.rateBs),
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
                    payment_method: 'pago_movil'
                };

                const payload = {
                    token: this.token,
                    data: data,
                };

                //return payload
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
                    var amountPayed = `$${parseInt((payment.monto / this.rateBs))}`;
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
                const tipo = 'pago_movil'
                const response = await this.$store.dispatch('checkout/paymentInfo', tipo).then( res => {
                    if(res.id){
                        console.log('====> estoooo payment', res)
                        this.payment_merchant_info = res; 
                        if(res.attributes.tasa_cambio && res.attributes.tasa_cambio > 0){
                            this.rateBs = res.attributes.tasa_cambio; 
                        }
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