<template>
  <section>
    <template v-show="false">
      <div>
        <figure>
          <p>Nombre:</p>
          <p>Numero de telefono:</p>
          <p>Banco:</p>
          <p>RIF:</p>
          <p>Motivo:</p>
        </figure>
        <figure>
          <figcaption>
            <strong>Subtotal en Bs</strong>
            <small>24.40</small>
          </figcaption>
        </figure>
      </div>
      <div>
        <strong
          >No disponemos de este metodo actualmente, por favor, seleccione
          otro.</strong
        >
      </div>
    </template>
    <form @submit.prevent="submit">
      <div class="form__group">
        <label class="form__label"
          >Nombre del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input
          v-model="formData.name"
          placeholder="john"
          :is-error="status.name.isError"
          :error-message="status.name.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Apellido del titular de cuenta<sup class="form__required"
            >*</sup
          ></label
        >
        <app-input
          v-model="formData.lastName"
          placeholder="doe"
          :is-error="status.lastName.isError"
          :error-message="status.lastName.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Fecha<sup class="form__required">*</sup></label
        >
        <app-input
          v-model="formData.date"
          type="date"
          :is-error="status.date.isError"
          :error-message="status.date.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Monto en Bs<sup class="form__required">*</sup></label
        >
        <p>
          <b
            >La tasa del día BCV es de {{ bcvUsd }} BsD. El monto del pago debe
            ser de {{ amountRate }}</b
          >
        </p>
        <app-input
          v-model="formData.amountPayed"
          :is-error="status.amountPayed.isError"
          :error-message="status.amountPayed.message"
        />
      </div>
      <div class="form__group">
        <label class="form__label"
          >Numero de confirmacion<sup class="form__required">*</sup></label
        >
        <app-input
          v-model="formData.confirmation"
          :is-error="status.confirmation.isError"
          :error-message="status.confirmation.message"
        />
      </div>
      <p>
        Al realizar esta compra usted acepta
        <a href="#" class="text-color-2">nuestros términos y condiciones</a>.
      </p>
      <div class="form__btn-group mt-4">
        <app-button
          type="submit"
          @click="submit"
          :disabled="isError || !verify()"
        >
          Enviar
        </app-button>
      </div>
    </form>
  </section>
</template>

<script lang="ts" setup>
import { useForm } from 'slimeform';
import * as yup from 'yup';
import { yupFieldRule } from 'slimeform/resolvers';
// import { CreateInvoice } from '~/graphql/mutations';

const { $notify, $httpsCallable } = useNuxtApp();
const router = useRouter();
// const graphql = useStrapiGraphQL();

const cart = useCartStore();
const auth = useAuthStore();
const checkout = useCheckoutStore();
const product = useProductStore();
const invoice = useInvoiceStore();

const bcvUsd = ref<number>(0);
const amountRate = ref<string>('');
const loadingBcvUsd = ref<boolean>(false);
const sending = ref<boolean>(false);
const productsCart = ref<Product[]>([]);
const productsMail = ref<Product[]>([]);

type SendEmailFn = (data: any) => Promise<{ message: string; status: number }>;
const httpsCallable = $httpsCallable as <T, U>(data: T) => U;

const {
  form: formData,
  status,
  submitter,
  verify,
  isError,
} = useForm({
  form: () => ({
    name: '',
    lastName: '',
    date: '',
    amountPayed: '',
    confirmation: '',
  }),
  rule: {
    name: yupFieldRule(yup.string().required('El campo es obligatorio')),
    lastName: yupFieldRule(yup.string().required('El campo es obligatorio')),
    date: yupFieldRule(yup.string().required('El campo es obligatorio')),
    amountPayed: yupFieldRule(
      yup
        .string()
        .test(
          'must-be-equal',
          'La cantidad no es igual al monto especificado',
          (value) => {
            return value === amountRate.value.toString();
          }
        )
        .required('El campo es obligatorio')
    ),
    confirmation: yupFieldRule(
      yup.string().required('El campo es obligatorio')
    ),
  },
  defaultMessage: '',
});

const { submit } = submitter(async () => {
  if (!verify()) return;

  try {
    sending.value = true;

    if (Date.parse(formData.date) > Date.parse(new Date().toISOString())) {
      $notify({
        group: 'all',
        title: 'Error!',
        text: `El monto del pago debe ser de ${amountRate.value} y la fecha debe concordar con el dia de hoy!`,
      });
      return;
    }

    const paymentData = {
      orderId: crypto.randomUUID(),
      name: formData.name,
      lastname: formData.lastName,
      confirmation: formData.confirmation.toString(),
      amount: formData.amountPayed,
      payment_date: formData.date,
    };

    const invoiceItems = cart.cartItems;
    // await createInvoice(paymentData, invoiceItems);
    await invoice.createInvoiceReport(paymentData, invoiceItems, 'pago_movil');

    $notify({
      group: 'all',
      title: 'Éxito',
      text: 'La orden se ha generado, se encuentra pendiente en aprobación',
    });

    sendInvoiceEmail(invoiceItems, paymentData);
  } catch (error) {
    console.log('Was an error while sending payment report');
  } finally {
    sending.value = false;
  }
});

async function sendInvoiceEmail(products: any[], payment: any) {
  try {
    let emailContent = '';
    // TODO! improve types
    const productItems: any[] = [];
    const created = new Date(payment.fecha_pago).toLocaleDateString();
    const amountPayed = `$${Number(payment.monto) / amountRate.value} USD`;
    const sendReceiptEmail = httpsCallable<string, SendEmailFn>(
      'sendReceiptEmail'
    );
    const sendMerchantEmail = httpsCallable<string, SendEmailFn>(
      'sendMerchantEmail'
    );

    products.forEach((item) => {
      const productFinded = productsMail.value.find(
        (mailProduct) => mailProduct.id == item.id
      );

      if (productFinded) {
        productItems.push({
          quantity: item.quantity,
          name: productFinded.name,
          amount: item.price,
          description: productFinded.description,
        });

        emailContent += emailTemplate({
          name: productFinded.name,
          price: item.price,
          quantity: item.quantity,
        });
      }
    });

    const orderId = `${payment.orderId} (PENDIENTE EN APROBACION)`;

    const merchant = {
      payed: amountPayed,
      email: auth.user.email,
      phone: checkout.phone,
      shipping: checkout.shippingAddress,
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: orderId,
    };

    const receipt = {
      payed: amountPayed,
      // email: 'novanet@mailinator.com', // payment.buyerEmailAddress,
      email: auth.user.email,
      nameCustomer: checkout.fullName,
      date: created,
      content: emailContent,
      order_id: orderId,
    };

    await Promise.all([sendReceiptEmail(receipt), sendMerchantEmail(merchant)]);

    $notify({
      group: 'all',
      title: 'Orden de compra generada',
      text: '¡Gracias por preferirnos!',
    });

    setTimeout(() => {
      cart.clear();
      router.push('/invoices');
    }, 1000);
  } catch (err) {
    console.log('sendInvoiceEmail Error: ', err);
    $notify({
      group: 'all',
      title: 'Error',
      text: '¡Hubo un error al enviar el email!',
    });
  }
}

const calculateAmountToPay = () => {
  const amount = bcvUsd.value * cart.amount;
  const [value, decimal] = amount.toString().split('.');
  amountRate.value = `${value},${decimal}`;
};

const getBCVUsd = async () => {
  const url = 'https://api.exchangedyn.com/markets/quotes/usdves/bcv';
  loadingBcvUsd.value = true;
  try {
    const response = await fetch(url);
    const data: BcvUsdResponse = await response.json();
    const mount = data.sources.BCV.quote.substring(0, 5);

    bcvUsd.value = parseFloat(mount);

    calculateAmountToPay();
  } catch (error) {
    console.log('Was an error fetching bcv usd dollar value');
  } finally {
    loadingBcvUsd.value = false;
  }
};

const getProducts = async () => {
  const itemsId = cart.cartItems.map((item) => item.id);
  const hasCartProducts = product.cartProducts?.length;

  if (!itemsId.length || !cart.cartItems.length) return;

  if (!hasCartProducts) {
    // fill from server
  }

  productsMail.value = product.cartProducts as Product[];
  productsCart.value = product.cartProducts as Product[];

  // const productPromises = itemsId.map((id: string) =>
  //   graphql<ProductsResponse>(GetProductById, { id })
  // );

  // const response = await Promise.all(productPromises);
  // let products: Product[] = [];

  // response.forEach((res) => {
  //   products = res.data.products.data;
  // });

  // state.productMail = products;
  // state.productsCart = products;
};

onMounted(() => {
  getBCVUsd();
  getProducts();
});
</script>
