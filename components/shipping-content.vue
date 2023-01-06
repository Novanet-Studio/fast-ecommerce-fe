<template>
  <div class="py-[6.25rem]">
    <div class="w-full px-3 mx-auto md:max-w-2xl lg:max-w-6xl">
      <div class="mb-12 text-center md:pb-[6.25rem]">
        <h1 class="text-2xl font-semibold text-yellow-400 md:text-5xl">
          Shipping Information
        </h1>
      </div>
      <div class="flex flex-col gap-8 lg:flex-row">
        <div class="flex-[0_0_100%] mb-8 md:(flex-[0_0_65%] mb-0)">
          <resume-information />

          <div class="flex justify-between items-center">
            <nuxt-link to="/checkout">
              <i class="icon-arrow-left mr-2"></i>
              Regresar
            </nuxt-link>
            <nuxt-link to="/payment" class="ps-btn">
              <!-- TODO: add slot in app-button component -->
              <app-button
                text="Continuar para el pago"
                @click="$router.push('/payment')"
              />
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
const { $store } = useNuxtApp();
const checkout = $store.checkout();
</script>
