<template>
  <!-- component -->
  <div class="flex flex-col">
    <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
      <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
        <div class="overflow-hidden">
          <table
            class="min-w-full"
            v-if="state.invoiceExist && state.tableInvoices?.length"
          >
            <thead class="bg-yellow-100 border-b">
              <tr>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                >
                  Nº
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                >
                  Factura
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                >
                  Fecha
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                >
                  Monto
                </th>
                <th
                  scope="col"
                  class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr
                class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                v-for="item in state.tableInvoices"
                :key="item.id"
                @click="goToInvoice(item.id_invoice_user.toString(), item)"
              >
                <td
                  class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                >
                  {{ item.id_invoice_user }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.payment_id }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  {{ item.date }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  ${{ item.amount }}
                </td>
                <td
                  class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                >
                  <span
                    class="p-2 rounded-md text-xs"
                    :class="item.paid ? 'bg-green-300' : 'bg-yellow-200'"
                    >{{ item.status }}</span
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <!-- <div class="table-responsive w-full">
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
          @click="goToInvoice(item.id_invoice_user.toString(), item)"
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
          @click="goToInvoice(item.id_invoice_user.toString(), item)"
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
  </div> -->
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
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
  invoicesList: InvoicesData[] | null;
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
  if (!state.tableInvoices?.length || !state.invoiceExist) return;

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
};

// 📝: Why this?
const setPageInvoice = (number: any) => console.log(number);

const goToInvoice = (invoiceId: string, invoiceItem: any) => {
  // invoice.invoice = invoiceItem;
  invoice.invoice = invoiceItem;
  router.push(`/invoices/${invoiceId}`);
};

const getPayments = async () => {
  const invoices = await invoice.fetchInvoices(auth.user.id);

  if (!invoices.length) {
    state.invoiceExist = false;
    return;
  }

  state.invoiceExist = true;
  state.tableInvoices = invoice.getMappedInvoices;

  pagination();
};

onMounted(() => {
  getPayments();
});
</script>

<style scoped>
.status-color {
  background-color: rgba(216, 255, 154, 0.603);
}

.invoice-hover:hover {
  background-color: #feeed7;
  color: #dd2400;
}
</style>
