<template>
  <section class="ps-page--my-account">
    <bread-crumb :breadcrumb="breadcrumb" />
    <div class="ps-my-account">
      <div class="container">
        <div class="ps-form--account">
          <ul class="ps-tab-list">
            <li class="active">
              <nuxt-link to="/login">
                Iniciar Sesión
              </nuxt-link>
            </li>
            <li>
              <nuxt-link to="/register">
                Registrarse
              </nuxt-link>
            </li>
          </ul>
          <div class="ps-tab active">
            <login-content />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
  pageTransition: {
    type: 'transition',
  },
});

const breadcrumb = ref([
  {
    text: 'Inicio',
    url: '/'
  },
  {
    text: 'Acceso'
  }
]);
</script>

<style lang="scss" scoped>
.ps-tab-list {
  padding-left: 0;
}
</style>
