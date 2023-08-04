<script setup>
definePageMeta({
  middleware: 'authentication',
});
</script>

<template>
  <section class="block mt-32">
    <header class="b-header">
      <h1 class="b-title">Informacion de envio</h1>
    </header>
    <div class="b-content">
      <div class="b-left">
        <resume-information />
        <div class="b-link-wrapper">
          <nuxt-link to="/checkout" class="flex items-center">
            <div class="i-ph-arrow-left-light mr-2" />
            Regresar
          </nuxt-link>
          <nuxt-link to="/payment" class="ps-btn">
            <app-button class="px-8" @click="$router.push('/payment')">
              Continuar con el pago
            </app-button>
          </nuxt-link>
        </div>
      </div>
      <div class="b-right">
        <app-order-summary :shipping="false" />
      </div>
    </div>
  </section>
</template>
