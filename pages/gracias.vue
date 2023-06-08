<template>
  <section class="relative min-h-screen bg-[#efeff1] text-center">
    <div
      class="min-h-screen flex flex-col flex-wrap justify-center items-center"
    >
      <figure>
        <nuxt-img class="mb-10" src="/gracias.jpg" alt="Gracias image" />
        <h3 class="mb-5 text-4xl text-color-2 font-bold">
          ¡Gracias por contactarnos!
        </h3>
        <p class="my-4 mb-30 text-xl">
          Le responderemos a la brevedad posible.
          <nuxt-link class="text-color-6" to="/">Regresar al inicio</nuxt-link>
        </p>
      </figure>
    </div>
  </section>
</template>

<script setup>
definePageMeta({
  layout: false,
});
</script>
