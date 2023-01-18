<template>
  <div class="ps-section__content">
    <div class="ps-section--account-setting">
      <div id="pdf-content">
        <div class="ps-section__header">
          <h3>
            Factura #{{ invoice?.id_invoice_user }} -
            <strong>Successful delivery PPU</strong>
          </h3>
        </div>
        <div class="ps-section__content">
          <div class="row">
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption>Address</figcaption>
                <div class="ps-block__content">
                  <strong>
                    {{ invoice?.fullName }}
                  </strong>
                  <p v-if="invoice?.shippingAddress">
                    Dirección:
                    {{ invoice.shippingAddress.address }},
                    <!-- {{ invoice.attributes.shippingAddress.addressLine1 }}, -->
                    {{ invoice.shippingAddress.locality }},
                    {{ invoice.shippingAddress.country }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption>Estado</figcaption>
                <div class="ps-block__content">
                  <p v-if="invoice?.paid">Pagado</p>
                  <p v-else>No pagado</p>
                  <p>
                    {{ invoice?.date }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption>Payment</figcaption>
                <div class="ps-block__content">
                  <p>Pago: {{ invoice?.cardKind }} {{ invoice?.cardType }},</p>
                  <p>Ultimos Cuatro digitos: {{ invoice?.cardLast }}</p>
                </div>
              </figure>
            </div>
          </div>
          <div class="table-responsive">
            <table class="table ps-table--shopping-cart">
              <thead>
                <tr>
                  <th>Productos</th>
                  <th>Precio</th>
                  <th>Cantidad</th>
                  <th>Monto</th>
                </tr>
              </thead>
              <tbody>
                <template v-for="(parentItem, index) in products" :key="index">
                  <tr
                    v-for="(product, index) in parentItem.data.products.data"
                    :key="product.id"
                  >
                    <td>{{ product.attributes.name }}</td>
                    <td class="price">$ {{ product.attributes.price }}</td>
                    <td>{{ invoice?.products[index].quantity }}</td>
                    <td class="price">$ {{ product.attributes.price }}</td>
                  </tr>
                </template>
                <tr>
                  <td></td>
                  <td></td>
                  <td>MONTO TOTAL</td>
                  <td>${{ invoice?.amount }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <nuxt-link to="/invoices">
        <a class="ps-btn ps-btn--sm"> regresar </a>
      </nuxt-link>
      <button @click="getPdf" class="ps-btn ps-btn--sm">PDF</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import pdfmake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import { getProductById as GetProductById } from '~/graphql';

const { $store } = useNuxtApp();
const graphql = useStrapiGraphQL();
const { invoice } = $store.invoice();

const products = ref<ProductsResponse[]>();

const getPdf = async () => {
  const element = document.querySelector('#pdf-content');
  const html = htmlToPdfmake(element?.innerHTML);
  const documentDefinition = {
    content: html,
  };
  pdfmake.vfs = pdfFonts.pdfMake.vfs;
  pdfmake.createPdf(documentDefinition).download();
};

const getProductsId = async (productList: any[]) => {
  if (!productList.length) return;
  const itemsId = productList.map((product) => product.id_product);
  const productPromises = itemsId.map((id: string) =>
    graphql<ProductsResponse>(GetProductById, { id })
  );

  const response = await Promise.all(productPromises);
  products.value = response;
};

onMounted(() => {
  getProductsId(invoice?.products ?? []);
});
</script>
