<template>
  <section class="block">
    <header class="block__header">
      <h1 class="block__title">Shipping Information</h1>
    </header>
    <div class="block__content">
      <div class="block__left">
        <resume-information />
        <div class="block__link-wrapper">
          <nuxt-link to="/checkout">
            <i class="icon-arrow-left mr-2"></i>
            Regresar
          </nuxt-link>
          <nuxt-link to="/payment" class="ps-btn">
            <!-- TODO: add slot in app-button component -->
            <app-button
              text="Continuar con el pago"
              @click="$router.push('/payment')"
            />
          </nuxt-link>
        </div>
      </div>
      <div class="block__right">
        <order-summary :shipping="false" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'authentication',
});
</script>
