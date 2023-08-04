<script setup>
definePageMeta({
  middleware: 'authentication',
});
</script>

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
        <app-order-summary />
      </div>
    </div>
  </section>
</template>

<style scoped>
.checkout {
  @apply w-full py-[6.25rem] px-3 mx-auto md: max-w-4xl lg:max-w-6xl;
}

.checkout__header {
  @apply mb-12 text-center md: pb-[6.25rem];
}

.checkout__title {
  @apply text-2xl font-semibold text-color-2 md: text-5xl;
}

.checkout__content {
  @apply flex flex-col gap-8 md: flex-row;
}

.checkout__main {
  @apply flex-[0_0_100%] md: flex-[0_0_65%];
}

.checkout__aside {
  @apply flex-[0_0_100%] md: flex-[0_0_35%];
}
</style>
