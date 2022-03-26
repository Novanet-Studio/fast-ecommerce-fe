import SquareActions, { baseUrl, headerSquare } from '~/repositories/SquareActions';
import { ApiError, Client, Environment } from 'square'

const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    customUrl: "https://connect.squareupsandbox.com",

});

export const state = () => ({

});

export const mutations = {
    setPaymentBody(state, payload){
        state.idempotencyKey = payload.idempotencyKey,
        state.locationId = payload.locationId,
        state.sourceId = payload.sourceId,
        state.amountMoney = payload.amountMoney,
        state.amountMoney.amount = payload.amountMoney.amount,
        state.amountMoney.currency = payload.amountMoney.currency
    }
}

export const actions = {
    async createPayment({commit, state}, payload){
        commit('setPaymentBody', payload)
        const payment = {
            idempotencyKey: state.idempotencyKey,
            locationId: state.locationId,
            sourceId: state.sourceId,
            amountMoney: {
                amount: state.amountMoney.amount,
                currency: state.amountMoney.currency,
            },
        };
        const {paymentsApi} = client;
        
        try {
            // return client
            const {response, ...httpResponse} = await paymentsApi.createPayment(payment)     
            const { statusCode, headers } = httpResponse;

            return { statusCode, headers, response };
            
        } catch (error) {
            if (error instanceof ApiError) {
                // If unsuccessful we will display the list of errors
                console.log("Errors: ", error.errors)
            } else {
                console.log("Unexpected Error: ", error)
            }
        }

        

    },

}

