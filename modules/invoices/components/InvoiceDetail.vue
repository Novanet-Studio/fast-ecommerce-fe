<template>
  <div class="ps-section__content">
    <div class="ps-section--account-setting">
      <div id="pdf-content">
        <div class="ps-section__header">
          <h3>
            Factura #{{ invoice.invoice.attributes.id_invoice_user }} -
            <strong>Successful delivery PPU</strong>
          </h3>
        </div>
        <div class="ps-section__content">
          <div class="row">
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption>
                  Address
                </figcaption>
                <div class="ps-block__content">
                  <strong>
                    {{ invoice.invoice.attributes.fullName }}
                  </strong>
                  <p v-if="invoice.invoice.shippingAddress">
                    Dirección: {{ invoice.invoice.attributes.shippingAddress.addressLine1 }},
                    {{ invoice.invoice.attributes.shippingAddress.locality }}, {{
                        invoice.invoice.attributes.shippingAddress.country
                    }}
                  </p>

                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption>
                  Estado
                </figcaption>
                <div class="ps-block__content">
                  <p v-if="invoice.invoice.attributes.paid">
                    Pagado
                  </p>
                  <p v-else>No pagado</p>
                  <p>
                    {{ invoice.invoice.attributes.date }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption>
                  Payment
                </figcaption>
                <div class="ps-block__content">
                  <p>
                    Pago: {{ invoice.invoice.attributes.cardKind }} {{ invoice.invoice.attributes.cardType }},
                  </p>
                  <p>Ultimos Cuatro digitos: {{ invoice.invoice.attributes.cardLast }}</p>
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
                <tr v-for="product, index in products" :key="product.id">
                  <td>{{ product.attributes.name }}</td>
                  <td class="price">$ {{ product.attributes.price }}</td>
                  <td>{{ invoice.invoice.attributes.products[index].quantity }}</td>
                  <td class="price">$ {{ product.attributes.price }}</td>
                </tr>
                <tr>
                  <td></td>
                  <td></td>
                  <td>MONTO TOTAL</td>
                  <td>${{ invoice.invoice.attributes.amount }}</td>

                </tr>
              </tbody>
            </table>

          </div>
        </div>
      </div>
      <nuxt-link to="/invoices">
        <a class="ps-btn ps-btn--sm ">
          regresar
        </a>
      </nuxt-link>
      <button @click="getPdf" class="ps-btn ps-btn--sm">PDF</button>
    </div>

  </div>
</template>

<script lang="ts" setup>
import html2PDF from 'jspdf-html2canvas';
import { useInvoice } from '~/store/invoice';
import { useProduct } from '~/store/product';

const invoice = useInvoice();
const product = useProduct();

const products = ref<any>(null);

const getPdf = () => {
  const element = document.querySelector('#pdf-content');
  const name = invoice.attributes.id_invoice_user;
  html2PDF(element, {
    jsPDF: {
      format: 'a4',
    },
    imageType: 'image/jpeg',
    output: `factura-${name}`,
    margin: {
      top: 20,
      right: 10,
      bottom: 20,
      left: 10,
    }
  });
}

const getProductsInvoice = async (idList: string[]) => {
  const response = await product.getProductsById(idList);
  return response.data;
}

const getProductsId = async (productList: any[]) => {
  const productsId = productList.map((product) => product.id_product);
  products.value = await getProductsInvoice(productsId);
}

onMounted(() => {
  getProductsId(invoice.invoice.attributes.products);
});

</script>
