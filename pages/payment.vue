<template>
  <div class="block mt-28">
    <header class="b-header">
      <h1 class="b-title">Método de pago</h1>
    </header>
    <div class="b-content">
      <div class="b-left">
        <resume-information />
        <h4 class="b-subtitle">Selecciona el método de pago</h4>
        <payment-methods />
        <div class="b-link-wrapper">
          <nuxt-link class="flex items-center" to="/shipping">
            <div class="i-ph-arrow-left-light mr-2" />
            Return to shipping
          </nuxt-link>
        </div>
      </div>
      <div class="b-right">
        <app-order-summary :shipping="false" />
      </div>
    </div>
    <app-notify />
  </div>
</template>
