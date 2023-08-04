<script setup>
const checkout = useCheckoutStore();
</script>

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

<style scoped>
.resume {
  @apply mb-8 px-5 py-3 border border-light-800 rounded-sm text-dark-200;
}

.resume__content {
  @apply mb-0 flex justify-between md: (items-center);
}

.resume__wrapper {
  @apply md: (w-full flex flex-row);
}

.resume__item-title {
  @apply flex-basis-[100%] text-sm max-w-40 md: (flex-0 max-w-18);
}

.resume__contact {
  @apply mt-0 mb-0 flex-basis-[100%] text-sm md: flex-1;
}

.resume__address {
  @apply mt-0 mb-0 flex-basis-[100%] text-sm;
}

.resume__link {
  @apply text-sm self-center text-color-6 max-w-40 text-right;
}
</style>
