<template>
  <div class="table-responsive">
    <table v-if="state.invoiceExist" class="table table-bordered">
      <thead>
        <tr>
          <th>Nº</th>
          <th>Factura</th>
          <th>Fecha</th>
          <th>Monto</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody v-if="!state.page">
        <tr
          v-for="item in state.tableInvoices"
          :key="item.id"
          @click="goToInvoice(item.id_invoice_user, item)"
        >
          <td class="invoice-hover">{{ item.id_invoice_user }}</td>
          <td>{{ item.payment_id }}</td>
          <td>{{ item.date }}</td>
          <td>${{ item.amount }}</td>
          <td v-if="item.paid === true" class="status-color">
            {{ item.status }}
          </td>
          <td v-else>{{ item.status }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr
          v-for="item in state.tableInvoices"
          :key="item.id"
          @click="goToInvoice(item.id_invoice_user, item)"
        >
          <td class="invoice-hover">{{ item.id_invoice_user }}</td>
          <td>{{ item.payment_id }}</td>
          <td>{{ item.date }}</td>
          <td>${{ item.amount }}</td>
          <td v-if="item.paid === true" class="status-color">
            {{ item.status }}
          </td>
          <td v-else>{{ item.status }}</td>
        </tr>
      </tbody>
    </table>
    <h4 class="text-lg text-yellow-400 font-bold mb-3" v-else>
      No posees ninguna factura aun!
    </h4>
    <div class="ps-pagination" v-if="state.page">
      hola
      <ul class="pagination">
        <li
          class="active"
          v-for="link in state.pages"
          @click="setPageInvoice(link)"
        >
          <a href="#">{{ link }}</a>
        </li>
        <li>
          <a href="#">
            Next Page
            <i class="icon-chevron-right"></i>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getInvoicesByUserId } from '~/graphql';

const { $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const router = useRouter();
const auth = $store.auth();
const invoice = $store.invoice();

const TABLE_LIMIT = 10;

type State = {
  invoiceExist: boolean;
  tableInvoices: InvoiceTableDetail[] | null;
  page: boolean;
  pages: any[];
  number: string | null;
  invoicesList: InvoiceDetail[] | null;
};

const state = reactive<State>({
  invoiceExist: false,
  tableInvoices: null,
  page: false,
  pages: [],
  number: null,
  invoicesList: null,
});

const pagination = () => {
  if (state.invoiceExist) {
    if (state.tableInvoices.length > TABLE_LIMIT) {
      state.page = true;
      state.number = (state.tableInvoices.length / TABLE_LIMIT).toFixed(0);
      // TODO: refactor this
      let pages = [];
      for (let i = 1; i <= Number(state.number); i++) {
        pages.push(i);
      }
      state.pages = pages;
    }
  }
};

// 📝: Why this?
const setPageInvoice = (number: any) => console.log(number);

const goToInvoice = (invoiceId: string, invoiceItem: any) => {
  // invoice.invoice = invoiceItem;
  invoice.invoice = invoiceItem;
  router.push(`/invoice/${invoiceId}`);
};

const getPayments = async () => {
  const {
    data: { invoices },
  } = await graphql<InvoicesResponse>(getInvoicesByUserId, {
    id: auth.user.id,
  });

  if (!invoices.data.length) {
    state.invoiceExist = false;
    return;
  }

  state.invoiceExist = true;
  state.tableInvoices = invoices.data.map((invoice, index) => {
    const item = invoice as unknown as {
      id: string;
      attributes: InvoiceDetail;
    };
    const invoices = {
      ...item.attributes,
      id_invoice_user: index + 1,
      date: new Date(item.attributes.createdAt).toLocaleDateString('ve-Es'),
      status: item.attributes.paid ? 'Pagado' : 'Cancelado',
    };

    return invoices;
  }) as unknown as InvoiceTableDetail[];

  pagination();
};

onMounted(() => {
  getPayments();
});
</script>

<style lang="scss" scoped>
.status-color {
  background-color: rgba(216, 255, 154, 0.603);
}

.invoice-hover:hover {
  background-color: #feeed7;
  color: #dd2400;
}
</style>
