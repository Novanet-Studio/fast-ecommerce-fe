import type { CreateCustomerRequest, Customer } from 'square';

interface CustomerResponse extends Customer {
  version: bigint;
}

export default defineEventHandler(async (event) => {
  const { square } = useRuntimeConfig();
  try {
    const data = (await readBody(event)) as CreateCustomerRequest;
    const body = {
      idempotencyKey: data.idempotencyKey,
      givenName: data.givenName,
      emailAddress: data.emailAddress,
    };
    const response = await $fetch<any>(
      'https://connect.squareupsandbox.com/v2/customers',
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
    const { version, ...customer } = response.customer as CustomerResponse;

    return {
      data: customer,
    };
  } catch (error) {
    return createError({
      statusCode: 500,
      statusMessage: 'Error creando el customer',
    });
  }
});
