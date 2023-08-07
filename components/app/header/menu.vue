<script setup>
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

<template>
  <ul class="menu">
    <li
      v-for="item in mainMenu"
      :key="item.text"
      class="menu__item"
      :class="$route.path === item?.url ? 'text-color-4' : 'text-color-2'"
    >
      <nuxt-link class="menu__link" :to="item.url">
        {{ item.text }}
      </nuxt-link>
    </li>
  </ul>
</template>

<style scoped>
.menu {
  @apply flex flex-col mb-2 lg:(flex-row mb-0 py-4);
}

.menu__item {
  @apply transition first:pl-0 hover:text-color-4;
}

.menu__link {
  @apply block py-[10px] pr-12 pl-0;
}
</style>
