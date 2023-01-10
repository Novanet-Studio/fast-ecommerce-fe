<template>
  <section>
    <ul class="auth__links">
      <li class="auth__link auth__link--active">
        <nuxt-link to="/login">Iniciar Sesión</nuxt-link>
      </li>
      <li class="auth__link">
        <nuxt-link to="/register">Registrarse</nuxt-link>
      </li>
    </ul>
    <div class="auth__content">
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
