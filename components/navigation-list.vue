<template>
  <ul class="navbar-nav me-auto mb-2 mb-lg-0" :class="class">
    <template v-for="item in mainMenu" :key="item.text">
      <li class="nav-item">
        <nuxt-link :to="item.url">
          {{ item.text }}
        </nuxt-link>
      </li>
    </template>
  </ul>
</template>

<script lang="ts" setup>
defineProps<{ class?: string }>();

const mainMenu = [
  {
    text: 'Inicio',
    url: '/',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
  {
    text: 'Nosotros',
    url: '/nosotros',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
  {
    text: 'Contáctanos',
    url: '/contacto',
    extraClass: 'menu-item-has-children',
    subClass: 'sub-menu',
  },
];
</script>
