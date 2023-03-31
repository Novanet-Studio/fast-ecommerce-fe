<template>
  <div class="ps-section__content">
    <div class="ps-section--account-setting border p-8">
      <div ref="pdfSection">
        <div class="ps-section__header py-3">
          <h3 class="text-xl flex items-center gap-2">
            Factura #{{ invoiceStore.invoice?.id_invoice_user }} -
            <!-- <strong>Successful delivery PPU</strong> -->
            <strong class="text-xs">Entrega exitosa PPU</strong>
          </h3>
        </div>
        <div class="ps-section__content">
          <div class="row">
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice border p-4 rounded-md">
                <figcaption>Dirección</figcaption>
                <div class="ps-block__content">
                  <strong>
                    {{ invoiceStore.invoice?.fullName }}
                  </strong>
                  <p v-if="invoiceStore.invoice?.shippingAddress">
                    Dirección:
                    {{ invoiceStore.invoice.shippingAddress.addressLine1 }},
                    <!-- {{ invoiceStore.invoice.attributes.shippingAddress.addressLine1 }}, -->
                    <!-- {{ invoiceStore.invoice.shippingAddress.locality }}, ??? -->
                    {{ invoiceStore.invoice.shippingAddress.locality }},
                    {{ invoiceStore.invoice.shippingAddress.country }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12 py-6">
              <figure class="ps-block--invoice">
                <figcaption class="border-b pb-2 font-bold">Estado</figcaption>
                <div class="ps-block__content flex gap-2 items-center">
                  <p v-if="invoiceStore.invoice?.paid">Pagado</p>
                  <p v-else>No pagado</p>
                  <p class="text-xs">
                    {{ invoiceStore.invoice?.date }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption class="border-b pb-2 font-bold">Pago</figcaption>
                <div class="ps-block__content">
                  <p>
                    Pago: {{ invoiceStore.invoice?.cardKind }},
                    {{ invoiceStore.invoice?.cardType }},
                  </p>
                  <p>
                    Ultimos Cuatro digitos: {{ invoiceStore.invoice?.cardLast }}
                  </p>
                </div>
              </figure>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-0">
                <div class="overflow-hidden">
                  <template v-if="invoiceStore.loading">
                    <loading />
                  </template>
                  <table class="min-w-full" v-else>
                    <thead class="bg-yellow-100 border-b">
                      <tr>
                        <th
                          scope="col"
                          class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                        >
                          Productos
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                        >
                          Precio
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                        >
                          Cantidad
                        </th>
                        <th
                          scope="col"
                          class="text-sm font-bold text-gray-900 px-6 py-4 text-left"
                        >
                          Monto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        v-for="(product, index) in invoiceStore.products"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                        >
                          {{ product.name }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        >
                          {{ product.price }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        >
                          {{ invoiceStore.invoice?.products[index].quantity }}
                        </td>
                        <td
                          class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap"
                        >
                          <!-- ${{ product.price }} -->
                        </td>
                      </tr>
                      <tr
                        class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                      >
                        <td
                          class="px-6 py-4 whitespace-nowrap text-sm font-bold text-gray-900"
                        >
                          MONTO TOTAL
                        </td>
                        <td></td>
                        <td></td>
                        <td
                          class="text-sm text-gray-900 font-bold px-6 py-4 whitespace-nowrap text-right"
                        >
                          ${{ invoiceStore.invoice?.amount }}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-4 mt-8">
        <nuxt-link to="/invoices">
          <a class="btn btn--outline">regresar</a>
        </nuxt-link>
        <button @click="exportToPDF('invoices.pdf', pdfSection)" class="btn">
          Generar PDF
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const invoiceStore = $store.invoice();
const pdfSection = ref<HTMLElement | undefined>(undefined);

onMounted(() => {
  invoiceStore.loadInvoiceProducts();
});
</script>
