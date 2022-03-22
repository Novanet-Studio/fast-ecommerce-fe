import axios from 'axios';
import { Client, Environment } from 'square'


const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
})
export default class PaymentSquare {
    constructor(callback){
        this.callback = callback;
    }
    
    async MakePayment(){
        return console.log(client.paymentsApi)
        const response = await client.paymentsApi.createPayment({
            sourceId: 'cnon:card-nonce-ok',
            idempotencyKey: '03c33958-6a47-41c6-8f2c-cd4d6350f3e9',
            amountMoney: {
            amount: 100,
            currency: 'USD'
            },
            customerId: 'TNYJE9GK48T4726GKGNR652WS4',
            locationId: 'LRJM1HWPWK5Q7',
            acceptPartialAuthorization: false,
            note: 'payment for test 1 dollar!'
        })
        .then(response =>{
            console.log(response.result)
            return response.result
        })
        .catch(error => {
            return console.log(error)
        })

        return response;

          
    }

}