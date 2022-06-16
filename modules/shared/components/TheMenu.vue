<template>
  <ul :class="className" class="flex flex-col mb-2 lg:flex-row">
    <li v-for="item in mainMenu" :key="item.text" class="first:pl-0">
      <!-- TODO: highlight active link -->
      <nuxt-link :to="item.url" class="block py-[10px] pr-12 pl-0">
        {{ item.text }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
type Props = {
  className: string;
}

withDefaults(defineProps<Props>(), {
  className: 'menu',
});


const mainMenu = ref([
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
])
</script>
