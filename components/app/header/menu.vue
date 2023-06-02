<template>
  <ul class="menu">
    <li
      v-for="item in mainMenu"
      :key="item.text"
      class="transition first:pl-0 hover:text-color-4"
      :class="$route.path === item?.url ? 'text-color-4' : 'text-color-2'"
    >
      <nuxt-link class="menu__item" :to="item.url">
        {{ item.text }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const mainMenu = ref([
  {
    text: 'Inicio',
    url: '/',
  },
  {
    text: 'Nosotros',
    url: '/nosotros',
  },
  {
    text: 'Contáctanos',
    url: '/contacto',
  },
]);
</script>

<style scoped>
.menu {
  @apply flex flex-col mb-2 lg:(flex-row mb-0 py-4);
}

.menu__item {
  @apply block py-[10px] pr-12 pl-0;
}
</style>
