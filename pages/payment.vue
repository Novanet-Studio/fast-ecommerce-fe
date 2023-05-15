<template>
  <div class="block">
    <header class="b-header">
      <h1 class="b-title">Método de pago</h1>
    </header>
    <div class="block__content">
      <div class="b-left">
        <resume-information />
        <h4 class="b-subtitle">Selecciona el método de pago</h4>
        <payment-methods />
        <div class="b-link-wrapper">
          <nuxt-link to="/shipping">
            <i class="icon-arrow-left mr-2"></i>
            Return to shipping
          </nuxt-link>
        </div>
      </div>
      <div class="b-right">
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
