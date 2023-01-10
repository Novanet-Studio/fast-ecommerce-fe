<template>
  <div class="resume">
    <figure class="resume__content">
      <div class="resume__wrapper">
        <small class="resume__item-title">Contacto:</small>
        <p class="resume__contact">
          {{ checkout.email }}
        </p>
      </div>
      <nuxt-link to="/checkout" class="resume__link">Cambiar</nuxt-link>
    </figure>
    <hr class="my-4" />
    <figure class="resume__content">
      <div class="resume__wrapper">
        <small class="resume__item-title">Enviar a:</small>
        <p class="resume__address">
          {{ checkout.fullAddress }}
        </p>
      </div>
      <nuxt-link to="/checkout" class="resume__link">Cambiar</nuxt-link>
    </figure>
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const checkout = $store.checkout();
</script>
