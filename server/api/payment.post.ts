import type { CreatePaymentRequest, Payment } from 'square';

interface PaymentResponse extends Payment {
  version: bigint;
}

export default defineEventHandler(async (event) => {
  const { square } = useRuntimeConfig();

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

    const response = await $fetch<any>(
      'https://connect.squareupsandbox.com/v2/payments',
      {
        method: 'POST',
        body,
        headers: {
          'Content-Type': 'application/json',
          'Square-Version': '2023-08-16',
          Authorization: `Bearer ${square.accessToken}`,
        },
      }
    );

    const parsedResponse = JSON.stringify(response, (_, value) =>
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
