<template>
  <section>
    <div>
      <ul class="p-4 flex justify-center">
        <li class="text-2xl text-yellow-500 font-bold mr-8">
          <nuxt-link to="/login">
            Iniciar Sesión
          </nuxt-link>
        </li>
        <li class="text-2xl font-bold text-dark-50">
          <nuxt-link to="/register">
            Registrarse
          </nuxt-link>
        </li>
      </ul>
    </div>
    <div class="mt-4">
      <login-content />
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'access',
  pageTransition: {
    name: 'zoom',
  },
});
</script>
