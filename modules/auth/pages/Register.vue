<template>
  <section class="ps-page--my-account">
    <bread-crumb :items="breadcrumbData" />
    <notify />
    <div class="ps-my-account">
      <div class="container">
        <div class="ps-form--account">
          <ul class="ps-tab-list">
            <li>
              <nuxt-link to="/login">
                Iniciar Sesión
              </nuxt-link>
            </li>
            <li class="active">
              <nuxt-link to="/register">
                Registrarse
              </nuxt-link>
            </li>
          </ul>
          <div class="ps-tab active">
            <register-content />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
  // transition: 'zoom',
  pageTransition: {
    name: 'zoom',
  },
});

const breadcrumbData = ref([
  {
    text: 'Inicio',
    url: '/'
  },
  {
    text: 'Registro'
  }
])

</script>

<style lang="scss" scoped>
.ps-tab-list {
  padding-left: 0;
}
</style>
