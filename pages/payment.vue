<template>
  <div class="block">
    <header class="block__header">
      <h1 class="block__title">Método de pago</h1>
    </header>
    <div class="block__content">
      <div class="block__left">
        <resume-information />
        <h4 class="block__subtitle">Selecciona el método de pago</h4>
        <payment-methods />
        <div class="block__link-wrapper">
          <nuxt-link to="/shipping">
            <i class="icon-arrow-left mr-2"></i>
            Return to shipping
          </nuxt-link>
        </div>
      </div>
      <div class="block__right">
        <order-summary :shipping="false" />
      </div>
    </div>
    <notify />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
  pageTransition: {
    name: 'page',
  },
});
</script>
