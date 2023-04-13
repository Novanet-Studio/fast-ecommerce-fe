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
  layout: 'layout-account',
  middleware: 'authentication',
});
</script>
