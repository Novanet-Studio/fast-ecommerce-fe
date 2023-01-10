<template>
  <section class="auth">
    <ul class="auth__links">
      <li class="auth__link">
        <nuxt-link to="/login">Iniciar Sesión</nuxt-link>
      </li>
      <li class="auth__link auth__link--active">
        <nuxt-link to="/register">Registrarse</nuxt-link>
      </li>
    </ul>
    <div class="auth__content">
      <register-content />
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'access',
  pageTransition: {
    name: 'zoom',
  },
  layoutTransition: {
    name: 'zoom',
  },
});
</script>
