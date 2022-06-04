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
        <tr v-for="item in state.tableInvoices" :key="item.id"
          @click="goToInvoice(item.attributes.id_invoice_user, item)">
          <td class="invoice-hover">{{ item.attributes.id_invoice_user }}</td>
          <td>{{ item.attributes.payment_id }}</td>
          <td>{{ item.attributes.date }}</td>
          <td>${{ item.attributes.amount }}</td>
          <td v-if="item.attributes.paid === true" class="status-color">{{ item.attributes.status }}</td>
          <td v-else>{{ item.attributes.status }}</td>
        </tr>
      </tbody>
      <tbody v-else>
        <tr v-for="item in state.tableInvoices" :key="item.id"
          @click="goToInvoice(item.attributes.id_invoice_user, item)">
          <td class="invoice-hover">{{ item.attributes.id_invoice_user }}</td>
          <td>{{ item.attributes.payment_id }}</td>
          <td>{{ item.attributes.date }}</td>
          <td>${{ item.attributes.amount }}</td>
          <td v-if="item.attributes.paid === true" class="status-color">{{ item.attributes.status }}</td>
          <td v-else>{{ item.attributes.status }}</td>
        </tr>
      </tbody>
    </table>
    <h4 v-else>No posees ninguna factura aun!</h4>
    <div class="ps-pagination" v-if="state.page">
      hola
      <ul class="pagination">
        <li class="active" v-for="link in state.pages" @click="setPageInvoice(link)">
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
import { useAuth } from '~/store/auth';
import { useCheckout } from '~/store/checkout';
import { useInvoice } from '~/store/invoice';

const router = useRouter();
const auth = useAuth();
const checkout = useCheckout();
const invoice = useInvoice();

const state = reactive({
  invoiceExist: false,
  tableInvoices: null,
  page: false,
  pages: [],
  number: null,
  invoicesList: null,
});

const pagination = () => {
  if (state.invoiceExist !== false) {
    if (state.tableInvoices.length > 10) {
      state.page = true;
      state.number = (state.tableInvoices.length / 10).toFixed(0);
      // TODO: refactor this
      var pages = []
      for (let i = 1; i <= (state.number); i++) {
        pages.push(i);
      }
      state.pages = pages;
    }
  }
}

// 📝: Why this?
const setPageInvoice = (number: any) => console.log(number);

const goToInvoice = (invoiceId: string, invoiceItem: any) => {
  invoice.invoice = invoiceItem;
  // const cookieParams = {
  //   invoice: invoice
  // }
  // this.$cookies.set('invoice', cookieParams, {
  //   path: '/',
  //   maxAge: 60 * 60 * 24 * 7
  // });
  // this.$router.push(`/invoice/${idInvUser}`)
  router.push(`/invoice/${invoiceId}`);
}

const getPayments = async () => {
  const invoicesList = await checkout.getInvoicesList(auth.user.id);
  if (!invoicesList.data.length) {
    state.invoiceExist = false;
    return;
  }

  // TODO: refactor this
  const res = invoicesList.data
  state.invoiceExist = true;
  for (let i = 0; i < res.length; i++) {
    res[i].attributes.id_invoice_user = i + 1;
    res[i].attributes.date = new Date(res[i].attributes.createdAt).toLocaleDateString()
    if (res[i].attributes.paid === true) {
      res[i].attributes.status = 'Pagado'
    } else {
      res[i].attributes.status = 'Cancelado'
    }
  }
  state.tableInvoices = res
  pagination();
}

onMounted(() => {
  getPayments();
})
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
