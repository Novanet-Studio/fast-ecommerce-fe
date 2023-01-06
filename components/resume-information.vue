<template>
  <div class="mb-8 px-5 py-3 border border-light-800 rounded-sm text-dark-200">
    <figure class="mb-0 flex justify-between md:(items-center)">
      <div class="md:(w-full flex flex-row)">
        <small class="flex-basis-[100%] text-sm max-w-40 md:(flex-0 max-w-18)">Contacto:</small>
        <p class="mt-0 mb-0 flex-basis-[100%] text-sm md:flex-1">{{ checkout.email }}</p>
      </div>
      <nuxt-link to="/checkout" class="text-sm self-center text-yellow-400 max-w-40 text-right">
        Cambiar
      </nuxt-link>
    </figure>
    <hr class="my-4">
    <figure class="mb-0 flex justify-between md:(items-center)">
      <div class="md:(w-full flex flex-row)">
        <small class="flex-basis-[100%] text-sm max-w-40 md:(flex-0 max-w-18)">Enviar a:</small>
        <p class="mt-0 mb-0 flex-basis-[100%] text-sm">
          {{ checkout.fullAddress }}
        </p>
      </div>
      <nuxt-link to="/checkout" class="text-sm self-center text-yellow-400 max-w-40 text-right">
        Cambiar
      </nuxt-link>
    </figure>
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const checkout = $store.checkout();
</script>