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
            // cardButton.disabled = true;
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

            const respuesta = await this.$store.dispatch('server/createPayment', paymentBody).then(res=>{
                return console.log(res)
            }).catch(error=>{
                return console.log(error)
            })

            if(respuesta){

                console.log(respuesta)
            }

        }
        
    }
}

</script>

<style lang="scss" scoped>
.highlight {
    color: $color-1st;
}
</style>
