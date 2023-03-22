import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import corsFn from 'cors';
import sgMail from '@sendgrid/mail';
import { Client, Environment } from 'square';
import type {
  CreateCustomerRequest,
  CreatePaymentRequest,
  Customer,
  Payment,
} from 'square';

admin.initializeApp();

const apikey = process.env.SENDGRID_API_KEY as string;
const senderMail = process.env.SENDGRID_SENDER_MAIL as string;
const receiverMail = process.env.SENDGRID_RECEIVER_MAIL as string;

const cors = corsFn({ origin: true });
const { customersApi, paymentsApi } = new Client({
  environment: Environment.Sandbox,
  accessToken:
    'EAAAEJyncqd3OPpoDxFbqfbNjmfeDnM_8OZmPxgUfk-ifWbwexuPqMaAUACyfdbs',
});

interface CustomerResponse extends Customer {
  version: bigint;
}

interface PaymentResponse extends Payment {
  version: bigint;
}

// Start writing Firebase Functions
// https://firebase.google.com/docs/functions/typescript

export const createCustomer = functions.https.onRequest((req, res) => {
  return cors(req, res, async () => {
    try {
      const data = req.body.data as CreateCustomerRequest;
      const body = {
        idempotencyKey: data.idempotencyKey,
        givenName: data.givenName,
        emailAddress: data.emailAddress,
      };
      const response = await customersApi.createCustomer(body);
      const { version, ...customer } = response.result
        .customer as CustomerResponse;
      res.status(200).send({
        data: customer,
      });
    } catch (error) {
      res.status(400).send({ error });
    }
  });
});

export const payment = functions.https.onRequest((req, res) =>
  cors(req, res, async () => {
    try {
      const data = req.body.data as CreatePaymentRequest;
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
          addressLine1: data.shippingAddress?.addressLine1,
          locality: data.shippingAddress?.locality,
          postalCode: data.shippingAddress?.postalCode,
          country: data.shippingAddress?.country,
        },
        billingAddress: {
          addressLine1: data.billingAddress?.addressLine1,
          locality: data.billingAddress?.locality,
          postalCode: data.billingAddress?.postalCode,
          country: data.billingAddress?.country,
        },
        note: data.note,
      };
      const response = await paymentsApi.createPayment(body);
      const parsedResponse = JSON.stringify(response.result, (_, value) =>
        typeof value === 'bigint' ? value.toString() : value
      );
      const { payment } = JSON.parse(parsedResponse);
      res.status(200).send({ data: payment as PaymentResponse });
    } catch (error) {
      res.status(400).send({ error });
    }
  })
);

export const sendReceiptEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { data } = req.body;

      sgMail.setApiKey(apikey);

      const msg = {
        to: data.email,
        from: senderMail,
        subject: `Fast-Ecommerce recibo de compra ${data.order_id}`,
        text: 'Fast-Ecommerce recibo de compra',
        html: `
      <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="width: 100%; max-width: 600px"
      align="center"
    >
      <tr>
        <td
          role="modules-container"
          style="padding: 0px 0px 0px 0px; color: #000000; text-align: left"
          bgcolor="#FFFFFF"
          width="100%"
          align="left"
        >
          <table
            class="module preheader preheader-hide"
            role="module"
            data-type="preheader"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="
              display: none !important;
              mso-hide: all;
              visibility: hidden;
              opacity: 0;
              color: transparent;
              height: 0;
              width: 0;
            "
          >
            <tr>
              <td role="module-content">
                <p></p>
              </td>
            </tr>
          </table>
    
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="ecb815cc-87bc-4a3f-a334-040d110516dc"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 5px 5px 5px 0px;
                    line-height: 20px;
                    text-align: inherit;
                    background-color: #e5dcd2;
                  "
                  height="100%"
                  valign="top"
                  bgcolor="#e5dcd2"
                  role="module-content"
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            style="padding: 15px 0px 15px 0px"
            bgcolor="#feeed7"
            data-distribution="1"
          >
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top">
                  <table
                    width="600"
                    style="
                      width: 600px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-0"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="wrapper"
                            role="module"
                            data-type="image"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="c7fa172a-cdbf-4e85-ac82-60844b32dd62"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    font-size: 6px;
                                    line-height: 10px;
                                    padding: 0px 0px 0px 0px;
                                  "
                                  valign="top"
                                  align="center"
                                >
                                  <a
                                    href="https://drive.google.com/file/d/1a3--7Qn1Tttcody0zbJlOzM0HXtY0ujs/view?usp=sharing"
                                    ><img
                                      class="max-width"
                                      border="0"
                                      style="
                                        display: block;
                                        color: #000000;
                                        text-decoration: none;
                                        font-family: Helvetica, arial, sans-serif;
                                        font-size: 16px;
                                      "
                                      width="150"
                                      alt="Farine logo"
                                      data-proportionally-constrained="true"
                                      data-responsive="false"
                                      src="http://cdn.mcauto-images-production.sendgrid.net/e5b36267a1a59cc3/a0cca121-e2b5-42d8-992e-0a8c93132c3e/150x150.png"
                                      height="150"
                                  /></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                          <table
                            class="module"
                            role="module"
                            data-type="text"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="594ac2bc-2bb0-4642-8002-a8c9b543d125"
                            data-mc-module-version="2019-10-22"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    padding: 10px 0px 0px 0px;
                                    line-height: 16px;
                                    text-align: inherit;
                                  "
                                  height="100%"
                                  valign="top"
                                  bgcolor=""
                                  role="module-content"
                                >
                                  <div>
                                    <div
                                      style="
                                        font-family: inherit;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #80817f; font-size: 12px"
                                        ><strong>Instagram</strong></span
                                      ><span
                                        style="color: #80817f; font-size: 12px"
                                      >
                                        @farinebyvane<br /> </span
                                      ><span style="color: #80817f; font-size: 12px"
                                        ><strong>Teléfono </strong></span
                                      ><span style="color: #80817f; font-size: 12px"
                                        >0412.319.48.27<br /> </span
                                      ><span style="color: #80817f; font-size: 12px"
                                        ><strong>Email </strong></span
                                      ><span style="color: #80817f; font-size: 12px"
                                        >vanessa@farinebyvane.com -
                                        farinebyvane@gmail.com</span
                                      >
                                    </div>
                                    <div></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 30px 0px 40px 0px;
                    line-height: 22px;
                    text-align: inherit;
                  "
                  height="100%"
                  valign="top"
                  bgcolor=""
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #80817f; font-size: 14px"
                        ><strong>¡Gracias por su compra!</strong></span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Recibo de compra</strong></span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #80817f; font-size: 12px"
                        >${data.date}</span
                      >
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9.1"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 0px 40px 40px 40px;
                    line-height: 22px;
                    text-align: inherit;
                  "
                  height="100%"
                  valign="top"
                  bgcolor=""
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Cliente:</strong></span
                      ><span style="color: #80817f; font-size: 12px">
                        ${data.nameCustomer}</span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Email:</strong></span
                      ><span style="color: #80817f; font-size: 12px">
                        ${data.email}</span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Orden: </strong></span
                      ><span style="color: #80817f; font-size: 12px"
                        >${data.order_id}</span
                      >
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="divider"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 40px 0px 40px"
                  role="module-content"
                  height="100%"
                  valign="top"
                  bgcolor=""
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    width="100%"
                    height="2px"
                    style="line-height: 2px; font-size: 2px"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px 0px 2px 0px" bgcolor="#80817f"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            style="padding: 0px 40px 0px 40px"
            bgcolor="#FFFFFF"
            data-distribution="1,1,1"
          >
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top">
                  <table
                    width="173"
                    style="
                      width: 173px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-0"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="module"
                            role="module"
                            data-type="text"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="64573b96-209a-4822-93ec-5c5c732af15c"
                            data-mc-module-version="2019-10-22"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    padding: 15px 0px 15px 0px;
                                    line-height: 22px;
                                    text-align: inherit;
                                  "
                                  height="100%"
                                  valign="top"
                                  bgcolor=""
                                  role="module-content"
                                >
                                  <div>
                                    <div
                                      style="
                                        font-family: inherit;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #80817f; font-size: 12px"
                                        ><strong>PRODUCTO</strong></span
                                      >
                                    </div>
                                    <div></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    width="173"
                    style="
                      width: 173px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-1"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="module"
                            role="module"
                            data-type="text"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1"
                            data-mc-module-version="2019-10-22"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    padding: 15px 0px 15px 0px;
                                    line-height: 22px;
                                    text-align: inherit;
                                  "
                                  height="100%"
                                  valign="top"
                                  bgcolor=""
                                  role="module-content"
                                >
                                  <div>
                                    <div
                                      style="
                                        font-family: inherit;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #80817f; font-size: 12px"
                                        ><strong>CANTIDAD</strong></span
                                      >
                                    </div>
                                    <div></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    width="173"
                    style="
                      width: 173px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-2"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="module"
                            role="module"
                            data-type="text"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.1"
                            data-mc-module-version="2019-10-22"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    padding: 15px 0px 15px 0px;
                                    line-height: 22px;
                                    text-align: inherit;
                                  "
                                  height="100%"
                                  valign="top"
                                  bgcolor=""
                                  role="module-content"
                                >
                                  <div>
                                    <div
                                      style="
                                        font-family: inherit;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #80817f; font-size: 12px"
                                        ><strong>PRECIO</strong></span
                                      >
                                    </div>
                                    <div></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="divider"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 40px 0px 40px"
                  role="module-content"
                  height="100%"
                  valign="top"
                  bgcolor=""
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    width="100%"
                    height="2px"
                    style="line-height: 2px; font-size: 2px"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px 0px 2px 0px" bgcolor="#80817f"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          ${data.content}
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="20d6cd7f-4fad-4e9c-8fba-f36dba3278fc"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 40px 30px 40px 30px;
                    line-height: 22px;
                    text-align: inherit;
                    background-color: #e36d65;
                  "
                  height="100%"
                  valign="top"
                  bgcolor="#80817f"
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #ffffff; font-size: 16px"
                        ><strong>TOTAL ${data.payed}</strong></span
                      >
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="spacer"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="54da3428-feae-4c1a-a740-9c9fdb4e52d7"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 0px 50px 0px"
                  role="module-content"
                  bgcolor=""
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9.2"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 10px 0px 20px 0px;
                    line-height: 22px;
                    text-align: inherit;
                  "
                  height="100%"
                  valign="top"
                  bgcolor=""
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #80817f; font-size: 14px"
                        ><strong
                          >¿Quieres ver todos nuestros productos?</strong
                        ></span
                      >
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
    
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="module"
            data-role="module-button"
            data-type="button"
            role="module"
            style="table-layout: fixed"
            width="100%"
            data-muid="0f986857-87df-4c0e-934f-e77105f78192"
          >
            <tbody>
              <tr>
                <td
                  align="center"
                  bgcolor=""
                  class="outer-td"
                  style="padding: 0px 0px 0px 0px"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="wrapper-mobile"
                    style="text-align: center"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          bgcolor="#feeed7"
                          class="inner-td"
                          style="
                            border-radius: 6px;
                            font-size: 16px;
                            text-align: center;
                            background-color: inherit;
                          "
                        >
                          <a
                            href=""
                            style="
                              background-color: #feeed7;
                              border: 1px solid #feeed7;
                              border-color: #feeed7;
                              border-radius: 0px;
                              border-width: 1px;
                              color: #e36d65;
                              display: inline-block;
                              font-size: 12px;
                              font-weight: 700;
                              letter-spacing: 0px;
                              line-height: normal;
                              padding: 12px 40px 12px 40px;
                              text-align: center;
                              text-decoration: none;
                              border-style: solid;
                              font-family: inherit;
                            "
                            target="_blank"
                            >Visita nuestra tienda Online</a
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="spacer"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="9bbc393c-c337-4d1a-b9f9-f20c740a0d44"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 0px 30px 0px"
                  role="module-content"
                  bgcolor=""
                ></td>
              </tr>
            </tbody>
          </table>
    
          <table
            class="module"
            role="module"
            data-type="divider"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1.2"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 40px 0px 40px"
                  role="module-content"
                  height="100%"
                  valign="top"
                  bgcolor=""
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    width="100%"
                    height="1px"
                    style="line-height: 1px; font-size: 1px"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px 0px 1px 0px" bgcolor="#80817f"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>  
          `,
      };

      await sgMail.send(msg);

      return res.status(200).json({
        data: {
          message: 'Email enviado',
          status: 200,
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.body);
      }
      return res.status(400).json({ status: 'ERROR', message: error.message });
    }
  });
});

export const sendMerchantEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      // creating sendgrid object request
      sgMail.setApiKey(apikey);

      const { data } = req.body;

      const msg = {
        to: receiverMail,
        from: senderMail,
        subject: `Fast-Ecommerce nueva orden ${data.order_id}`,
        text: 'Fast-Ecommerce nueva orden',
        html: `
      <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      border="0"
      style="width: 100%; max-width: 600px"
      align="center"
    >
      <tr>
        <td
          role="modules-container"
          style="padding: 0px 0px 0px 0px; color: #000000; text-align: left"
          bgcolor="#FFFFFF"
          width="100%"
          align="left"
        >
          <table
            class="module preheader preheader-hide"
            role="module"
            data-type="preheader"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="
              display: none !important;
              mso-hide: all;
              visibility: hidden;
              opacity: 0;
              color: transparent;
              height: 0;
              width: 0;
            "
          >
            <tr>
              <td role="module-content">
                <p></p>
              </td>
            </tr>
          </table>
    
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="ecb815cc-87bc-4a3f-a334-040d110516dc"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 5px 5px 5px 0px;
                    line-height: 20px;
                    text-align: inherit;
                    background-color: #e5dcd2;
                  "
                  height="100%"
                  valign="top"
                  bgcolor="#e5dcd2"
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: right"></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            style="padding: 15px 0px 15px 0px"
            bgcolor="#feeed7"
            data-distribution="1"
          >
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top">
                  <table
                    width="600"
                    style="
                      width: 600px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-0"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="wrapper"
                            role="module"
                            data-type="image"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="c7fa172a-cdbf-4e85-ac82-60844b32dd62"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    font-size: 6px;
                                    line-height: 10px;
                                    padding: 0px 0px 0px 0px;
                                  "
                                  valign="top"
                                  align="center"
                                >
                                  <a
                                    href="https://drive.google.com/file/d/1a3--7Qn1Tttcody0zbJlOzM0HXtY0ujs/view?usp=sharing"
                                    ><img
                                      class="max-width"
                                      border="0"
                                      style="
                                        display: block;
                                        color: #000000;
                                        text-decoration: none;
                                        font-family: Helvetica, arial, sans-serif;
                                        font-size: 16px;
                                      "
                                      width="150"
                                      alt="Farine logo"
                                      data-proportionally-constrained="true"
                                      data-responsive="false"
                                      src="http://cdn.mcauto-images-production.sendgrid.net/e5b36267a1a59cc3/a0cca121-e2b5-42d8-992e-0a8c93132c3e/150x150.png"
                                      height="150"
                                  /></a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 30px 0px 40px 0px;
                    line-height: 22px;
                    text-align: inherit;
                  "
                  height="100%"
                  valign="top"
                  bgcolor=""
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #80817f; font-size: 14px"
                        ><strong
                          >¡Se ha registrado una nueva orden en la Web!</strong
                        ></span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Recibo de compra</strong></span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #80817f; font-size: 12px"
                        >${data.date}</span
                      >
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9.1"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                    padding: 0px 40px 40px 40px;
                    line-height: 22px;
                    text-align: inherit;
                  "
                  height="100%"
                  valign="top"
                  bgcolor=""
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Cliente:</strong></span
                      ><span style="color: #80817f; font-size: 12px">
                        ${data.nameCustomer}</span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Email:</strong></span
                      ><span style="color: #80817f; font-size: 12px">
                        ${data.email}</span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Telefono:</strong></span
                      ><span style="color: #80817f; font-size: 12px">
                        ${data.phone}</span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Orden: </strong></span
                      ><span style="color: #80817f; font-size: 12px"
                        >${data.order_id}</span
                      >
                    </div>
                    <div style="font-family: inherit; text-align: inherit">
                      <span style="color: #80817f; font-size: 12px"
                        ><strong>Direccion de envio: </strong></span
                      ><span style="color: #80817f; font-size: 12px"
                        >${data.shipping}</span
                      >
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            align="center"
            width="100%"
            role="module"
            data-type="columns"
            style="padding: 0px 40px 0px 40px"
            bgcolor="#FFFFFF"
            data-distribution="1,1,1"
          >
            <tbody>
              <tr role="module-content">
                <td height="100%" valign="top">
                  <table
                    width="173"
                    style="
                      width: 173px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-0"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="module"
                            role="module"
                            data-type="text"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="64573b96-209a-4822-93ec-5c5c732af15c"
                            data-mc-module-version="2019-10-22"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    padding: 15px 0px 15px 0px;
                                    line-height: 22px;
                                    text-align: inherit;
                                  "
                                  height="100%"
                                  valign="top"
                                  bgcolor=""
                                  role="module-content"
                                >
                                  <div>
                                    <div
                                      style="
                                        font-family: inherit;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #80817f; font-size: 12px"
                                        ><strong>PRODUCTO</strong></span
                                      >
                                    </div>
                                    <div></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    width="173"
                    style="
                      width: 173px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-1"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="module"
                            role="module"
                            data-type="text"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1"
                            data-mc-module-version="2019-10-22"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    padding: 15px 0px 15px 0px;
                                    line-height: 22px;
                                    text-align: inherit;
                                  "
                                  height="100%"
                                  valign="top"
                                  bgcolor=""
                                  role="module-content"
                                >
                                  <div>
                                    <div
                                      style="
                                        font-family: inherit;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #80817f; font-size: 12px"
                                        ><strong>CANTIDAD</strong></span
                                      >
                                    </div>
                                    <div></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table
                    width="173"
                    style="
                      width: 173px;
                      border-spacing: 0;
                      border-collapse: collapse;
                      margin: 0px 0px 0px 0px;
                    "
                    cellpadding="0"
                    cellspacing="0"
                    align="left"
                    border="0"
                    bgcolor=""
                    class="column column-2"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px; margin: 0px; border-spacing: 0">
                          <table
                            class="module"
                            role="module"
                            data-type="text"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            width="100%"
                            style="table-layout: fixed"
                            data-muid="64573b96-209a-4822-93ec-5c5c732af15c.1.1"
                            data-mc-module-version="2019-10-22"
                          >
                            <tbody>
                              <tr>
                                <td
                                  style="
                                    padding: 15px 0px 15px 0px;
                                    line-height: 22px;
                                    text-align: inherit;
                                  "
                                  height="100%"
                                  valign="top"
                                  bgcolor=""
                                  role="module-content"
                                >
                                  <div>
                                    <div
                                      style="
                                        font-family: inherit;
                                        text-align: center;
                                      "
                                    >
                                      <span style="color: #80817f; font-size: 12px"
                                        ><strong>PRECIO</strong></span
                                      >
                                    </div>
                                    <div></div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="divider"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 40px 0px 40px"
                  role="module-content"
                  height="100%"
                  valign="top"
                  bgcolor=""
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    width="100%"
                    height="2px"
                    style="line-height: 2px; font-size: 2px"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px 0px 2px 0px" bgcolor="#80817f"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          ${data.content}
          <table
            class="module"
            role="module"
            data-type="text"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="20d6cd7f-4fad-4e9c-8fba-f36dba3278fc"
            data-mc-module-version="2019-10-22"
          >
            <tbody>
              <tr>
                <td
                  style="
                  padding: 40px 30px 40px 30px;
                  line-height: 22px;
                  text-align: inherit;
                  background-color: #e36d65;
                "
                  height="100%"
                  valign="top"
                  bgcolor="#80817f"
                  role="module-content"
                >
                  <div>
                    <div style="font-family: inherit; text-align: center">
                      <span style="color: #ffffff; font-size: 16px"
                        ><strong>TOTAL ${data.payed}</strong></span
                      >
                    </div>
                    <div></div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="spacer"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="54da3428-feae-4c1a-a740-9c9fdb4e52d7"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 0px 50px 0px"
                  role="module-content"
                  bgcolor=""
                ></td>
              </tr>
            </tbody>
          </table>
          <table
            border="0"
            cellpadding="0"
            cellspacing="0"
            class="module"
            data-role="module-button"
            data-type="button"
            role="module"
            style="table-layout: fixed"
            width="100%"
            data-muid="0f986857-87df-4c0e-934f-e77105f78192"
          >
            <tbody>
              <tr>
                <td
                  align="center"
                  bgcolor=""
                  class="outer-td"
                  style="padding: 0px 0px 0px 0px"
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    class="wrapper-mobile"
                    style="text-align: center"
                  >
                    <tbody>
                      <tr>
                        <td
                          align="center"
                          bgcolor="#feeed7"
                          class="inner-td"
                          style="
                            border-radius: 6px;
                            font-size: 16px;
                            text-align: center;
                            background-color: inherit;
                          "
                        >
                          <a
                            href="https://farine-be-test.herokuapp.com/admin"
                            style="
                              background-color: #feeed7;
                              border: 1px solid #feeed7;
                              border-color: #feeed7;
                              border-radius: 0px;
                              border-width: 1px;
                              color: #e36d65;
                              display: inline-block;
                              font-size: 12px;
                              font-weight: 700;
                              letter-spacing: 0px;
                              line-height: normal;
                              padding: 12px 40px 12px 40px;
                              text-align: center;
                              text-decoration: none;
                              border-style: solid;
                              font-family: inherit;
                            "
                            target="_blank"
                            >Ir al Panel administrativo</a
                          >
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            class="module"
            role="module"
            data-type="spacer"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="9bbc393c-c337-4d1a-b9f9-f20c740a0d44"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 0px 30px 0px"
                  role="module-content"
                  bgcolor=""
                ></td>
              </tr>
            </tbody>
          </table>
    
          <table
            class="module"
            role="module"
            data-type="divider"
            border="0"
            cellpadding="0"
            cellspacing="0"
            width="100%"
            style="table-layout: fixed"
            data-muid="c614d8b1-248a-48ea-a30a-8dd0b2c65e10.1.2"
          >
            <tbody>
              <tr>
                <td
                  style="padding: 0px 40px 0px 40px"
                  role="module-content"
                  height="100%"
                  valign="top"
                  bgcolor=""
                >
                  <table
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    align="center"
                    width="100%"
                    height="1px"
                    style="line-height: 1px; font-size: 1px"
                  >
                    <tbody>
                      <tr>
                        <td style="padding: 0px 0px 1px 0px" bgcolor="#80817f"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </td>
      </tr>
    </table>    
          `,
      };

      await sgMail.send(msg);

      return res.status(200).json({
        data: {
          message: 'Email enviado',
          status: 200,
        },
      });
    } catch (error: any) {
      if (error.response) {
        console.log(error.response.body);
      }

      return res.status(400).json({ status: 'ERROR', message: error.message });
    }
  });
});
