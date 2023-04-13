<template>
  <section class="checkout">
    <header class="checkout__header">
      <h1 class="checkout__title">Informacion de facturación</h1>
    </header>
    <div class="checkout__content">
      <div class="checkout__main">
        <checkout-information-form />
      </div>
      <div class="checkout__aside">
        <order-summary />
      </div>
    </div>
  </section>
</template>

<script>
definePageMeta({
  middleware: 'authentication',
});
</script>
