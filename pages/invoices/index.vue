<template>
  <section class="invoices">
    <header class="invoices__header">
      <h3 class="invoices__title">Ordenes de compra</h3>
    </header>
    <div class="invoices__content">
      <invoices-table />
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});
</script>

<style scoped>
.invoices {
  @apply lg:ml-8 lg:w-full;
}

.invoices__header {
  @apply mb-[30px] pb-[10px] border-b-2 border-b-light-800 flex w-full;
}

.invoices__title {
  @apply text-2xl font-semibold text-color-2;
}

.invoices__content {
  @apply p-5 bg-white;
}
</style>
