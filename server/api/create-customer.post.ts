import { Client, Environment } from 'square';
import type { CreateCustomerRequest, Customer } from 'square';

interface CustomerResponse extends Customer {
  version: bigint;
}

const { customersApi } = new Client({
  environment: Environment.Sandbox,
  accessToken:
    'EAAAEJyncqd3OPpoDxFbqfbNjmfeDnM_8OZmPxgUfk-ifWbwexuPqMaAUACyfdbs',
});

export default defineEventHandler(async (event) => {
  try {
    const data = (await readBody(event)) as CreateCustomerRequest;
    const body = {
      idempotencyKey: data.idempotencyKey,
      givenName: data.givenName,
      emailAddress: data.emailAddress,
    };
    const response = await customersApi.createCustomer(body);
    const { version, ...customer } = response.result
      .customer as CustomerResponse;

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
