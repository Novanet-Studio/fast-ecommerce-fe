const functions = require("firebase-functions");
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true });
const { Client, Environment } = require('square');
const { parse } = require("uuid");
admin.initializeApp()

const client = new Client({
  environment: Environment.Sandbox,
  accessToken: 'EAAAEEny2OgXH3WFBXDqWhY1OIiknyh5iqk41zZz1-VIVB1zf8KZseakFwUlRNQq',
})

const paymentsApi = client.paymentsApi;
const customersApi = client.customersApi;

exports.createCustomer = functions.https.onCall(async (data)=>{
  const body = {
    idempotencyKey: data.idempotencyKey,
    givenName: data.givenName,
    emailAddress: data.emailAddress,
  }
  try {

    const response = await customersApi.createCustomer(
      body
    ).then(res => {
      console.log(response.result)
      return {respuesta: response.result, stat: 'ok'}
    })
    
  } catch (error) {
    console.log(error)
  }
});



exports.payment = functions.https.onCall(async (data)=>{

  const body = {
    idempotencyKey: data.idempotencyKey,
    locationId: data.locationId,
    sourceId: data.sourceId,
    amountMoney: {
        amount: data.amountMoney.amount,
        currency: data.amountMoney.currency,
    },
    buyerEmailAddress: data.buyerEmailAddress,
    shippingAddress: {
        addressLine1: data.addressLine1,
        locality: data.locality,
        postalCode: data.postalCode,
        country: data.country
    }
  }
  try {
    const response = await paymentsApi.createPayment(
      body
    ).then(res => {
      console.log(response.result);
      return  {respuesta: response.result, stat: 'ok'};
    }).catch(err=>{
      return err
    });
 
  } catch(error) {
    console.log(error);
  }

});
