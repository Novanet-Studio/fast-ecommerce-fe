import { Client, Environment } from 'square';
import type { CreatePaymentRequest, Payment } from 'square';

interface PaymentResponse extends Payment {
  version: bigint;
}

const { paymentsApi } = new Client({
  environment: Environment.Sandbox,
  accessToken:
    'EAAAEJyncqd3OPpoDxFbqfbNjmfeDnM_8OZmPxgUfk-ifWbwexuPqMaAUACyfdbs',
});

export default defineEventHandler(async (event) => {
  try {
    const data = (await readBody(event)) as CreatePaymentRequest;
    const body = {
      idempotencyKey: data.idempotencyKey,
      locationId: data.locationId,
      sourceId: data.sourceId,
      customerId: data.customerId,
      amountMoney: {
        amount: data.amountMoney?.amount,
        currency: data.amountMoney?.currency,
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

    return {
      data: payment as PaymentResponse,
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Error procesando el pago',
    });
  }
});
