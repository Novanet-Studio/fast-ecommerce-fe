const express = require("express");
const bodyParser = require('body-parser')
const sgMail = require('@sendgrid/mail');

const app = express();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const senderMail = process.env.SENDGRID_SENDER_MAIL;

app.use(bodyParser.json())
app.post("/", (req, res) => {

    const msg = {
        to: req.body.email, 
        from: senderMail,
        subject: `Gracias por tu compra con nosotros ${req.body.nameCustomer}!!`,
        text: 'Farine Compras',
        html: `
        <div width="90%" style="box-shadow: 1px 1px 20px #cec9c9">
        <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9" data-mc-module-version="2019-10-22">
        <tbody>
        <tr>
            <td style="padding:30px 0px 40px 0px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>GRACIAS POR COMPRAR CON NOSOTROS.</strong></span><br><span style="color: #80817f; font-size: 12px">${req.body.nameCustomer}</span></div>
                <div style="font-family: inherit; text-align: center"><br></div>
                <div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>Recibo de compra</strong></span></div>
                <div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px">${req.body.date}</span></div><div></div></div></td>
        </tr>
        </tbody>
    </table>
    <table class="module" role="module" data-type="text" border="0" cellpadding="0" cellspacing="0" width="100%" style="table-layout: fixed;" data-muid="8fd711e6-aecf-4663-bf53-6607f08b57e9.1" data-mc-module-version="2019-10-22">
        <tbody>
        <tr>
            <td style="padding:0px 40px 40px 40px; line-height:22px; text-align:inherit;" height="100%" valign="top" bgcolor="" role="module-content">
            <div>
                <div style="font-family: inherit; text-align: inherit">
                    <span style="color: #80817f; font-size: 12px">
                        <strong>Correo electronico:</strong>
                    </span>
                    <span style="color: #80817f; font-size: 12px; text-decoration: none;"> 
                        ${req.body.email}
                    </span>
                </div>
            </div>
            </td>
        </tr>
        <tr>
            <td style="padding:30px 0px 40px 0px; line-height:22px; text-align:inherit;" height="100%" width="90%" valign="top" bgcolor="" role="module-content"><div><div style="font-family: inherit; text-align: center"><span style="color: #80817f; font-size: 12px"><strong>Puedes revisar esta factura detalladamente desde la seccion de ordenes de nuestra pagina!.</strong></span></div>
            </td>
        </tr>
        ${req.body.content}
        <tr>
            <td style="padding:40px 40px 40px 40px; line-height:22px; text-align:center; background-color: #feeed7" height="100%" valign="top" bgcolor="" role="module-content">
                <div style="font-family: inherit; text-align: center; margin: 0 auto;">
                    <span style="color: #343a40; font-size: 15px">
                        <strong>Monto Total pagado:</strong>
                    </span>
                    <span style="color: #343a40; font-size: 15px; text-decoration: none;"> 
                        ${req.body.payed}
                    </span>
                </div>
            </td>
        </tr>

        </tbody>
    </table>

    </div>`,
      }

      try {
        sgMail
        .send(msg)
        .then(() => {
            return res.status(200).json({ 'message': 'Email sent!', 'stat': 200 })
        })
        .catch((error) => {
            return res.status(400).json({ 'error': 'Opsss... Something went wrong ' + error })
        })
      } catch (error) {
        console.log(error);
        if (error.response) {
          console.log(error.response.body);
        }
        res.status(400).json({ status: "ERROR", message: error.message });
      }


});

module.exports = {
    path: "/api/sendgrid-mail",
    handler: app,
};