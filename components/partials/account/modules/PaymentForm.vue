<template>
<div>
    <form id="payment-form">
    <div id="card-container"></div>
    <button id="card-button" type="button">Pay $1.00</button>
    </form>
    <div id="payment-status-container"></div>

</div>
</template>

<script>

export default {
  name: "paymentForm",
  computed: {
    appId(){
        return process.env.SQUARE_APPLICATION_ID;
    },
    locationId(){
        return process.en.SQUARE_LOCATION_ID;
    } 
  },
  mounted: async function() {
    const payments = Square.payments(this.appId, this.locationId);
    const card = await payments.card();
    await card.attach('#card-container');
    this.card = card
  },
  methods: {
    async handlePaymentMethodSubmission(){
        const cardButton = document.getElementById('card-button');
            // cardButton.disabled = true;
            //creando token para la tarjeta
            this.card.tokenize().then(res => {
                if(res.token) {
                    var token = res.token;
                    var idempotencyKeyGen = uuidv4();
                    var payment = {
                        idempotencyKey: idempotencyKeyGen,
                        locationId: this.locationId,
                        sourceId: token,
                        amountMoney: {
                            amount: "2000",
                            currency: "USD",
                        },
                    };
                    this.createPayment(payment)                    
                }
            }).catch(error => {
                return console.log(error)
            });
    },

    async createPayment(paymentBody){
        await this.$fire.functions.payment()
    }
  }

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style> 