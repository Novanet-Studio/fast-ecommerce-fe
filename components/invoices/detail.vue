<script lang="ts" setup>
const invoiceStore = useInvoiceStore();
const pdfSection = ref<HTMLElement | undefined>(undefined);
const isLoading = ref(false);

onMounted(async () => {
  try {
    isLoading.value = false;
    await invoiceStore.loadInvoiceProducts();
  } catch (e) {
  } finally {
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="ps-section__content">
    <div class="ps-section--account-setting">
      <div ref="pdfSection" class="p-4 text-sm">
        <div class="ps-section__header py-3 border-b">
          <h3 class="text-xl flex items-center gap-2 text-color-2">
            Factura #{{ invoiceStore.invoice?.id_invoice_user }} -
            <strong class="text-sm">Entrega exitosa PPU</strong>
          </h3>
        </div>
        <div class="ps-section__content mt-4 p-4 bg-white">
          <div class="row flex gap-6 w-full">
            <div class="col-md-4 col-12 w-full">
              <figure class="ps-block--invoice">
                <figcaption class="border-b pb-2 mb-2 font-bold text-color-2">
                  Dirección
                </figcaption>
                <div class="ps-block__content mt-2">
                  <strong class="text-sm">
                    {{ invoiceStore.invoice?.fullName }}
                  </strong>
                  <p class="text-sm" v-if="invoiceStore.invoice?.shippingAddress">
                    Dirección:
                    {{ invoiceStore.invoice.shippingAddress.addressLine1 }},
                    <!-- {{ invoiceStore.invoice.attributes.shippingAddress.addressLine1 }}, -->
                    <!-- {{ invoiceStore.invoice.shippingAddress.locality }}, ??? -->
                    {{ invoiceStore.invoice.shippingAddress.locality }},
                    {{ invoiceStore.invoice.shippingAddress.country }}
                    <br />
                    {{ invoiceStore.invoice.shippingAddress.zipCode }}
                    <b>Apt, casa: </b>
                    {{ invoiceStore.invoice.shippingAddress.home }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12 w-full">
              <figure class="ps-block--invoice">
                <figcaption class="border-b pb-2 mb-2 font-bold text-color-2">
                  Estado
                </figcaption>
                <div class="ps-block__content flex flex-col">
                  <p v-if="invoiceStore.invoice?.paid" class="mb-0">Pagado</p>
                  <p class="mb-0" v-else>Pendiente en aprobación</p>
                  <p class="text-xs">
                    {{ invoiceStore.invoice?.date }}
                  </p>
                </div>
              </figure>
            </div>
            <div class="col-md-4 col-12 w-full">
              <figure class="ps-block--invoice">
                <figcaption class="border-b pb-2 mb-2 font-bold text-color-2">
                  Pago
                </figcaption>
                <div class="ps-block__content" v-if="invoiceStore.invoice?.cardKind !== 'no aplica'">
                  <p class="text-sm">
                    Pago: {{ invoiceStore.invoice?.cardKind }},
                    {{ invoiceStore.invoice?.cardType }},
                  </p>
                  <p class="text-sm">
                    Ultimos Cuatro digitos: {{ invoiceStore.invoice?.cardLast }}
                  </p>
                </div>
                <div class="ps-block__content" v-else>
                  <p class="text-sm">
                    Pago: {{ invoiceStore.invoice?.payment_method || '---' }}
                  </p>
                  <p class="text-sm">
                    Confirmacion de pago:
                    {{
                      invoiceStore.invoice?.payment_info[0]?.confirmacion ||
                      '---'
                    }}
                  </p>
                </div>
              </figure>
            </div>
          </div>
          <div class="flex flex-col">
            <div class="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div class="py-2 inline-block min-w-full">
                <div class="overflow-hidden">
                  <template v-if="isLoading">
                    <loading />
                  </template>
                  <table class="min-w-full" v-else>
                    <thead class="bg-gray-100 border-b">
                      <tr>
                        <th scope="col" class="text-sm font-bold text-color-2 px-6 py-4 text-left">
                          Productos
                        </th>
                        <th scope="col" class="text-sm font-bold text-color-2 px-6 py-4 text-left">
                          Precio
                        </th>
                        <th scope="col" class="text-sm font-bold text-color-2 px-6 py-4 text-left">
                          Cantidad
                        </th>
                        <th scope="col" class="text-sm font-bold text-color-2 px-6 py-4 text-left">
                          Monto
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
                        v-for="(product, index) in invoiceStore.products">
                        <td class="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-900">
                          {{ product.name }}
                        </td>
                        <td class="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                          {{ product.price }}
                        </td>
                        <td class="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                          {{ invoiceStore.invoice?.products[index].quantity }}
                        </td>
                        <td class="text-xs text-gray-900 font-light px-6 py-4 whitespace-nowrap text-center">
                          ${{ product.price }}
                        </td>
                      </tr>
                      <tr class="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100">
                        <td class="px-6 py-4 whitespace-nowrap text-xs font-bold text-gray-900">
                          MONTO TOTAL
                        </td>
                        <td></td>
                        <td></td>
                        <td class="text-xs text-gray-900 font-bold px-6 py-4 whitespace-nowrap text-right">
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
      <div class="flex gap-4 mt-8 ml-8">
        <nuxt-link to="/invoices">
          <a class="btn px-5">regresar</a>
        </nuxt-link>
        <button @click="
          exportToPDF(
            `factura-${invoiceStore.invoice?.id_invoice_user}`,
            pdfSection,
            { format: 'a4', unit: 'px' },
            {
              margin: 10,
              image: { type: 'jpeg', quality: 8 },
              width: 600,
              windowWidth: 780,
            }
          )
          " class="btn !w-32 text-color-2">
          Generar PDF
        </button>
      </div>
    </div>
  </div>
</template>
