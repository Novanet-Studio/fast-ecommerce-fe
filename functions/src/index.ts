import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import * as corsFn from 'cors';

admin.initializeApp();

const cors = corsFn({ origin: true });

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const createCustomer = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    res.status(200).send({ message: 'customer created' });
  });
});

export const payment = functions.https.onRequest((req, res) =>
  cors(req, res, async () => {
    res.status(200).send({ message: 'Payment done' });
  })
);
