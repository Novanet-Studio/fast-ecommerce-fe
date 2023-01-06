<template>
  <div class="py-[6.25rem]">
    <div class="w-full px-3 mx-auto md:max-w-2xl lg:max-w-6xl">
      <div class="text-center pb-16 md:pb-[6.25rem]">
        <h1 class="text-3xl font-semibold text-yellow-400 md:text-5xl">Método de pago</h1>
      </div>
      <div class="flex flex-col gap-8 lg:flex-row">
        <div class="flex-[0_0_100%] md:flex-[0_0_65%]">
          <resume-information />

          <h4 class="text-lg text-yellow-400 mt-0 mb-6 font-bold md:mb-3">Selecciona el método de pago</h4>
          <payment-methods />
          <div class="flex justify-between items-center">
            <nuxt-link to="/shipping">
              <i class="icon-arrow-left mr-2"></i>
              Return to shipping
            </nuxt-link>
          </div>
        </div>
        <div class="flex-[0_0_100%] md:flex-[0_0_35%]">
          <order-summary :shipping="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});

const { $store } = useNuxtApp();
</script>
