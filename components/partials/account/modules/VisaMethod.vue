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
                Pagar
            </button>

        </div>
    </form>
    <div id="payment-status-container"></div>

</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
export default {
    name: 'VisaMethod',
    data: () => ({
        card: null,
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
    },
    mounted: async function() {
        const payments = Square.payments(process.env.SQUARE_APPLICATION_ID, process.env.SQUARE_LOCATION_ID);
        const card = await payments.card();
        await card.attach('#card-container');
        this.card = card
    },
    methods: {
        async handlePayment(){
            const cardButton = document.getElementById('card-button');
            cardButton.disabled = true;
            //creando token para la tarjeta
            this.card.tokenize().then(res => {
                if(res.token) {
                    var token = res.token;
                    var idempotencyKeyGen = uuidv4();
                    var payment = {
                        idempotencyKey: idempotencyKeyGen,
                        locationId: process.env.SQUARE_LOCATION_ID,
                        sourceId: token,
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
                        }
                    };
                    this.createPayment(payment)                    
                }
            }).catch(error => {
                return console.log(error)
            });
        },

        async createPayment(paymentBody){

            const respuesta = await this.$fire.functions.httpsCallable('payment');
            respuesta(paymentBody).then(res => {
                const idk = JSON.parse(res.data);
                console.log(idk, 'desde el componente')
            }).catch(error=>{
                console.log(error)
            })

        }
        
    }
}

</script>

<style lang="scss" scoped>
.highlight {
    color: $color-1st;
}
</style>
