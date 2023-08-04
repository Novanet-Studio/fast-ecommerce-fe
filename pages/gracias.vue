<script setup>
definePageMeta({
  layout: false,
});
</script>

<template>
  <section class="section">
    <div class="wrapper">
      <figure>
        <nuxt-img class="mb-10" src="/gracias.jpg" alt="Gracias image" />
        <h3 class="title">¡Gracias por contactarnos!</h3>
        <p class="text">
          Le responderemos a la brevedad posible.
          <nuxt-link class="text-color-6" to="/">Regresar al inicio</nuxt-link>
        </p>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.section {
  @apply relative min-h-screen bg-[#efeff1] text-center;
}

.wrapper {
  @apply min-h-screen flex flex-col flex-wrap justify-center items-center;
}

.title {
  @apply mb-5 text-4xl text-color-2 font-bold;
}

.text {
  @apply my-4 mb-30 text-xl;
}
</style>
