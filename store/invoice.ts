import { defineStore } from 'pinia';
import {
  createInvoice as CreateInvoice,
  getInvoicesByUserId as GetInvoicesByUserId,
} from '~/graphql';
import type { OrderResponseBody } from '@paypal/paypal-js';

type InvoiceStore = {
  invoices: Invoice[] | null;
  invoice: InvoiceTableDetail | null;
};

const invoiceMapperHelper = (
  invoice: Invoice,
  index: number
): InvoiceTableDetail => {
  const invoices = {
    ...invoice,
    id_invoice_user: index + 1,
    date: new Date(
      invoice.attributes.createdAt as unknown as string
    ).toLocaleDateString('es-VE'),
    status: invoice.attributes.paid ? 'Pagado' : 'Cancelado',
  };

  return invoices as unknown as InvoiceTableDetail;
};

export const useInvoice = defineStore('invoice', {
  state: () =>
    ({
      invoice: null,
      invoices: null,
    } as InvoiceStore),
  getters: {
    getMappedInvoices(): InvoiceTableDetail[] {
      if (!this.invoices) return [];
      return this.invoices?.map(invoiceMapperHelper);
    },
  },
  actions: {
    async fetchInvoices(userId: string): Promise<Invoice[]> {
      const graphql = useStrapiGraphQL();
      const id = userId;

      const {
        data: { invoices },
      } = await graphql<InvoicesResponse>(GetInvoicesByUserId, {
        id,
      });

      if (!invoices.data.length) return [];

      this.invoices = invoices.data;
      return invoices.data;
    },
    async createInvoice(order: OrderResponseBody, items: CartItem[]) {
      const { $store } = useNuxtApp();
      const graphql = useStrapiGraphQL();
      const auth = $store.auth();
      const checkout = $store.checkout();
      const orderAddress = order.purchase_units[0].shipping?.address;
      const address = {
        phone: checkout.phone,
        home: checkout.home,
        country: orderAddress?.country_code,
        locality: orderAddress?.admin_area_2,
        postalCode: orderAddress?.postal_code,
        addressLine1: orderAddress?.address_line_1,
      };

      const paymentInfo = {
        nombre: order.payer.name?.given_name,
        apellido: order.payer.name?.surname,
        email: order.payer.email_address,
        confirmacion: order.id,
        monto: order.purchase_units[0].amount.value,
        fecha_pago: order.create_time,
      };

      const body = {
        amount: order.purchase_units[0].amount.value,
        order_id: order.purchase_units[0].invoice_id,
        paid: true,
        payment_id: order.id,
        products: items,
        user_id: auth.user.id,
        shippingAddress: address,
        fullName: checkout.fullName,
        cardType: 'no aplica',
        cardKind: 'no aplica',
        cardLast: 'no aplica',
        payment_info: [paymentInfo],
        payment_method: 'paypal',
      };

      const { data } = await graphql<InvoiceResponse>(CreateInvoice, {
        invoice: body,
      });

      return data;
    },
  },
});
