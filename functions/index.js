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

exports.createCustomer = functions.https.onRequest( (req, res) => {
    cors( req, res, async ()=> {
      const data = req.body.data;

      const body = {
        idempotencyKey: data.idempotencyKey,
        givenName: data.givenName,
        emailAddress: data.emailAddress,
      }
      try {
        customersApi.createCustomer(
          body
        ).then(ress => {
          const respuesta = JSON.stringify(ress.result, (key, value) =>
          typeof value === 'bigint'
              ? value.toString()
              : value // return everything else unchanged
          )
          console.log(respuesta, 'desde el cloud')
          res.status(200).send({data: respuesta})
        }).catch(err=>{
          console.log(err, 'error 400 pupusito')
          res.status(400).send({error: err})
        });
        
      } catch (error) {
        console.log(error);
        res.status(400).send({error: error})
      }
    })
  }
  
);


exports.payment = functions.https.onRequest((req, res)=>{
  cors(req, res, async ()=>{
    // return console.log(req.body)
    const data = req.body.data;
    const body = {
      idempotencyKey: data.idempotencyKey,
      locationId: data.locationId,
      sourceId: data.sourceId,
      customerId: data.customerId,
      amountMoney: {
          amount: data.amountMoney.amount,
          currency: data.amountMoney.currency,
      },
      buyerEmailAddress: data.buyerEmailAddress,
      shippingAddress: {
          addressLine1: data.shippingAddress.addressLine1,
          locality: data.shippingAddress.locality,
          postalCode: data.shippingAddress.postalCode,
          country: data.shippingAddress.country
      }
    }
    try {
      paymentsApi.createPayment(
        body
      ).then(ress=> {
        const respuesta = JSON.stringify(ress.result, (key, value) =>
        typeof value === 'bigint'
            ? value.toString()
            : value // return everything else unchanged
        )
        console.log(respuesta, 'desde el cloud');
        res.status(200).send({data: respuesta})
      }).catch(err=>{
        console.log(err, 'error 400 pupusito')
        res.status(400).send({error: err})
      });
   
    } catch(error) {
      console.log(error);
      res.status(400).send({error: error})
    }
  })

});
