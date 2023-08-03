import { useForm } from 'vee-validate';
import { object, string, minLength, equal } from 'valibot';
import { toTypedSchema } from '@vee-validate/valibot';
import { PaymentReportError, SendInvoiceEmailError } from '~/errors';

type Form = {
  name: string;
  lastName: string;
  date: string;
  amountPayed: string;
  confirmation: string;
};

interface Params {
  equalAmountTo: string;
  method: PaymentMethod;
  payment: {
    validation: (form: Form) => boolean;
    message: string;
  };
}

interface UsePaymentForm {
  isSending: Ref<boolean>;
  hasError: Ref<boolean>;
  submit: () => void;
}

export default function usePaymentForm({
  equalAmountTo,
  method,
  payment,
}: Params): UsePaymentForm {
  if (!equalAmountTo || !method || !payment?.message || !payment?.validation) {
    throw new Error('All parameters are required');
  }

  const isSending = useState('isSending', () => false);
  const hasError = useState('hasError', () => false);

  const { $notify } = useNuxtApp();
  const cart = useCartStore();
  const invoice = useInvoiceStore();

  const schema = toTypedSchema(
    object({
      name: string([minLength(1, 'Este campo es requerido')]),
      lastName: string([minLength(1, 'Este campo es requerido')]),
      date: string([minLength(1, 'Este campo es requerido')]),
      amountPayed: string([
        minLength(1, 'Este campo es requerido'),
        equal(equalAmountTo, 'La cantidad no es igual al monto especificado'),
      ]),
      confirmation: string([minLength(1, 'Este campo es requerido')]),
    })
  );

  const { handleSubmit, errors } = useForm<Form>({
    validationSchema: schema,
  });

  const submit = handleSubmit(async (data) => {
    try {
      isSending.value = true;

      if (payment.validation(data)) {
        $notify({
          group: 'all',
          title: 'Error!',
          text: payment.message,
        });
        return;
      }

      const paymentData: PaymentObject = {
        orderId: crypto.randomUUID(),
        name: data.name,
        lastname: data.lastName,
        confirmation: data.confirmation,
        amount: data.amountPayed,
        paymentDate: data.date,
      };

      const invoiceItems = cart.cartItems;
      await invoice.createInvoiceReport(paymentData, invoiceItems, method);

      $notify({
        group: 'all',
        title: 'Éxito',
        text: 'La orden se ha generado, se encuentra pendiente en aprobación',
      });

      await invoice.sendEmail(invoiceItems, paymentData);
    } catch (error) {
      if (error instanceof PaymentReportError) {
        $notify({
          group: 'all',
          title: 'Error',
          text: '¡Hubo un error al reportar tu pago!',
        });
      }

      if (error instanceof SendInvoiceEmailError) {
        $notify({
          group: 'all',
          title: 'Error',
          text: '¡Hubo un error al enviar el email!',
        });
      }
    } finally {
      isSending.value = false;
    }
  });

  watch(errors, () => {
    hasError.value = Object.values(errors.value).some((k) => k);
  });

  return {
    isSending,
    submit,
    hasError,
  };
}
