<template lang="html">
  <div>
    <form id="payment-form">
      <div id="card-container"></div>
      <div class="form-group">
        <p>
          Al realizar esta compra usted acepta
          <a href="#" class="terms">nuestros términos y condiciones</a>.
        </p>
        <button
          class="ps-btn ps-btn--fullwidth"
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
import { v4 as uuidv4 } from "uuid";
import { mapState } from "vuex";
import ProductRepository from "~/repositories/ProductoRepository";

export default {
  name: "VisaMethod",
  data: () => ({
    card: null,
    loading: false,
    resumen: "",
    productMail: "",
    productosFinalesHtml: "",
    productsCart: "",
  }),
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
    const payments = Square.payments(
      process.env.SQUARE_APPLICATION_ID,
      process.env.SQUARE_LOCATION_ID
    );
    const card = await payments.card();
    await card.attach("#card-container");
    this.card = card;
    console.log(this.cart);
    console.log(this.cookie);
    // this.invoicesTest(this.cart.cartItems)
    console.log("la cookie", this.cookie);
  },
  methods: {
    async handlePayment() {
      const cardButton = document.getElementById("card-button");
      cardButton.disabled = true;
      //creando token para la tarjeta
      this.card
        .tokenize()
        .then(async (res) => {
          if (res.token) {
            this.loading = true;
            var token = res.token;
            var idempotencyKeyGen = uuidv4();
            var payment = {
              idempotencyKey: idempotencyKeyGen,
              locationId: process.env.SQUARE_LOCATION_ID,
              sourceId: token,
              customerId: this.customerId,
              amountMoney: {
                amount: parseInt(this.cart.amount) * 100,
                currency: "USD",
              },
              buyerEmailAddress: this.email,
              shippingAddress: {
                addressLine1: `${this.cookie.address}`,
                home: this.cookie.home,
                locality: this.cookie.city,
                postalCode: this.cookie.zipCode,
                country: "VE",
                phone: this.cookie.phone,
              },
              billingAddress: {},
              note: this.fullName,
            };
            const billingResponse = await this.hasBilling()
              .then((res) => {
                return res;
              })
              .catch((error) => {
                console.log(error);
              });
            console.log("hay billing? ", billingResponse);
            if (billingResponse !== false) {
              console.log(billingResponse);
              payment.billingAddress = billingResponse;
            } else {
              payment.billingAddress = {
                addressLine1: "no aplicable",
                locality: "no aplicable",
                postalCode: "00000",
                country: "VE",
              };
            }
            console.log(payment);
            this.createPayment(payment);
          }
        })
        .catch((error) => {
          return console.log(error);
        });
    },

    async createPayment(paymentBody) {
      const respuesta = await this.$fire.functions.httpsCallable("payment");
      respuesta(paymentBody)
        .then(async (res) => {
          const squareResponse = JSON.parse(res.data);
          const paymentInfo = squareResponse.payment;
          if (paymentInfo.status === "COMPLETED") {
            // alert('PAGO REALIZADO')
            this.$notify({
              group: "all",
              title: "¡Proceso exitoso!",
              text: `El pago se realizado con exito!`,
            });
            this.loading = false;
            const itemInvoices = this.cart.cartItems;
            await this.createInvoice(paymentInfo, itemInvoices).then(
              (respuesta) => {
                console.log(respuesta);
                if (respuesta.status === 200 && respuesta.statusText == "OK") {
                  // alert('INVOICE CREADO')
                  this.$notify({
                    group: "all",
                    title: "Recibo creado",
                    text: `Se encuentra disponible en sus ordenes!`,
                  });
                  this.sendInvoiceMail(itemInvoices, paymentInfo);
                }
              }
            );
          }
          console.log(squareResponse);
        })
        .catch((error) => {
          console.log(error);
        });
    },

    async createInvoice(payment, products) {
      var productName = this.productsCart;
      var setItems = [];
      products.map(async function(products) {
        var finded = productName.find((item) => item.id === products.id);
        if (finded) {
          setItems.push({
            id_product: products.id,
            quantity: products.quantity,
            name_product: finded.attributes.name,
          });
        }
      });

      console.log("====> estp", setItems);
      payment.shippingAddress.phone = this.cookie.phone;
      payment.shippingAddress.home = this.cookie.home;

      const paymentInfo = {
        nombre: this.cookie.name,
        apellido: this.cookie.lastName,
        email: payment.buyerEmailAddress,
        confirmacion: payment.id,
        monto: payment.totalMoney.amount / 100,
        fecha_pago: new Date(),
      };

      const data = {
        amount: payment.totalMoney.amount / 100,
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
        payment_info: [paymentInfo],
        payment_method: "sqaureUp",
      };

      const payload = {
        token: this.token,
        data: data,
      };
      // console.log('lo que se envia al invoice',data)
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
        return console.log(
          "====> el repo",
          respuesta,
          this.productMail,
          this.productsCart
        );
      } catch (error) {
        console.log(error);
      }
    },

    async sendInvoiceMail(products, payment) {
      try {
        var productos = [];
        var created = new Date(payment.createdAt).toLocaleDateString();
        var amountPayed = `$${parseInt(payment.amountMoney.amount) / 100} USD`;
        let query = "";
        // products.forEach((item) => {
        //   var finded = this.productMail.find(
        //     (product) => product.id === item.id
        //   );
        //   if (finded) {
        //     productos.push({
        //       quantity: item.quantity,
        //       name: finded.attributes.name,
        //       amount: item.price,
        //       description: finded.attributes.description,
        //     });
        //   }
        // });

        for (let item of products) {
          var finded = this.productMail.find(
            (product) => product.id === item.id
          );
          if (finded) {
            console.log(finded);
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
            };
            var queryResponse = await this.$store
              .dispatch("checkout/productsMailQuery", payload)
              .then((res) => {
                return res;
              });

            if (query === "") {
              query = queryResponse;
            } else {
              query = query + queryResponse;
            }
          }
        }

        console.log("===> pagos", payment);
        const dataSgmail = {
          apikey: process.env.SENDGRID_API_KEY,
          senderMail: process.env.SENDGRID_SENDER_MAIL,
          receiverMail: process.env.SENDGRID_ORDER_RECEIVER_MAIL,
        };
        const merchant = {
          payed: amountPayed,
          email: this.email,
          phone: this.cookie.phone,
          shipping: `${this.cookie.address} ${this.cookie.home}, ${this.cookie.city}. Zip Code: ${this.cookie.zipCode}. ${this.cookie.country}`,
          nameCustomer: this.fullName,
          date: created,
          content: query,
          order_id: payment.orderId,
          dataSgmail: dataSgmail,
        };

        this.$axios
          .$post(
            "https://us-central1-farine-square-service.cloudfunctions.net/sendRecip",
            {
              payed: amountPayed,
              email: payment.buyerEmailAddress,
              nameCustomer: payment.note,
              date: created,
              content: query,
              order_id: payment.orderId,
              dataSgmail: dataSgmail,
            }
          )
          .then(async (res) => {
            console.log("lo de axios ===>", res);
            if (res.stat && res.stat === 200) {
              await this.sendMerchantMail(merchant);
            }
          });
        // alert('se envio el correo')
      } catch (error) {
        console.log("error en el correo");
      }
    },
    async hasBilling() {
      const type = "billing";
      const userId = this.user.id;

      const data = {
        userId: userId,
        type: type,
      };

      const response = await this.$store
        .dispatch("checkout/getAddress", data)
        .then((res) => {
          var response = false;
          if (res.length > 0) {
            console.log("el billing ===>", res);
            const address = res[0].attributes.address;
            response = {
              addressLine1: address.direccion,
              locality: address.estado,
              postalCode: address.zipcode,
              country: address.pais,
            };
          }
          return response;
        })
        .catch((error) => {
          console.log("error address", error);
          return false;
        });

      return response;
    },
    async sendMerchantMail(data) {
      try {
        console.log(data);
        this.$axios
          .$post(
            "https://us-central1-farine-square-service.cloudfunctions.net/sendMerchant",
            data
          )
          .then(async (res) => {
            console.log("lo de axios DOS ===>", res);
            if (res.stat && res.stat === 200) {
              this.$notify({
                group: "all",
                title: "Orden de compra generada",
                text: `¡Gracias por preferirnos!`,
              });
              await new Promise((resolve) => setTimeout(resolve, 2000));
              this.$router.push("/");
              this.$store.dispatch("cart/clearCart");
            }
          });
      } catch (error) {
        console.log("error enviando correo marchatn", error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.btn-pagar {
  font-weight: 500;
  font-size: 20px;
  padding: 0;
  color: black;
  margin: 0;

  &:hover {
    color: white;
  }
}
</style>
