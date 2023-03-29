<template>
  <div class="ps-section__content">
    <div class="ps-section--account-setting border p-8">
      <div ref="pdfSection">
        <div class="ps-section__header py-3">
          <h3 class="text-xl flex items-center gap-2">
            Factura #{{ invoice?.id_invoice_user }} -
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
                    {{ invoice?.fullName }}
                  </strong>
                  <p v-if="invoice?.shippingAddress">
                    Dirección:
                    {{ invoice.shippingAddress.addressLine1 }},
                    <!-- {{ invoice.attributes.shippingAddress.addressLine1 }}, -->
                    <!-- {{ invoice.shippingAddress.locality }}, ??? -->
                    {{ invoice.shippingAddress.locality }},
                    {{ invoice.shippingAddress.country }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12 py-6">
              <figure class="ps-block--invoice">
                <figcaption class="border-b pb-2 font-bold">Estado</figcaption>
                <div class="ps-block__content flex gap-2 items-center">
                  <p v-if="invoice?.paid">Pagado</p>
                  <p v-else>No pagado</p>
                  <p class="text-xs">
                    {{ invoice?.date }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12">
              <figure class="ps-block--invoice">
                <figcaption class="border-b pb-2 font-bold">Pago</figcaption>
                <div class="ps-block__content">
                  <p>Pago: {{ invoice?.cardKind }} {{ invoice?.cardType }},</p>
                  <p>Ultimos Cuatro digitos: {{ invoice?.cardLast }}</p>
                </div>
              </figure>
            </div>
          </div>
          <div class="flex flex-col" v-if="!isLoading">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full sm:px-6 lg:px-0">
                <div class="overflow-hidden">
                  <table class="min-w-full">
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
                        v-for="(product, index) in invoiceProducts"
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
                          {{ invoice?.products[index].quantity }}
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
                          ${{ invoice?.amount }}
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
const {
  invoice,
  loadInvoiceProducts,
  products: invoiceProducts,
} = $store.invoice();

const pdfSection = ref<HTMLElement | undefined>(undefined);
const isLoading = ref(false);

onMounted(async () => {
  isLoading.value = true;
  try {
    await loadInvoiceProducts();
  } catch (error) {
  } finally {
    isLoading.value = false;
  }
});
</script>
