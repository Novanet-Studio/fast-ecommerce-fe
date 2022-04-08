const functions = require("firebase-functions");
const admin = require('firebase-admin')
const cors = require('cors')({ origin: true });
const { Client, Environment } = require('square')
admin.initializeApp()

const client = new Client({
  environment: Environment.Sandbox,
  accessToken: 'EAAAEEny2OgXH3WFBXDqWhY1OIiknyh5iqk41zZz1-VIVB1zf8KZseakFwUlRNQq',
})

const paymentsApi = client.paymentsApi;

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.testFunction = functions.https.onCall(() => {
  console.info('Test Function triggered')
  return { message: "Yeaaahh it's working!" }
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
  }
  try {
    const response = await paymentsApi.createPayment(
      body
    );
  
    console.log(response.result);
  } catch(error) {
    console.log(error);
  }
  return  {response: response, mensaje: 'desde las funciones'}

});
