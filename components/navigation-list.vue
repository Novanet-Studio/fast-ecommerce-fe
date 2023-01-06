<template>
  <ul :class="className" class="navbar-nav me-auto mb-2 mb-lg-0">
    <template v-for="item in mainMenu" :key="item.text">
      <li class="nav-item">
        <nuxt-link :to="item.url">
          {{ item.text }}
        </nuxt-link>
      </li>
    </template>
  </ul>
</template>

<script>

export default {
  name: 'MenuDefault',
  props: {
    className: {
      type: String,
      default: 'menu'
    }
  },
  data() {
    return {
      mainMenu: [
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

      ]
    };
  }
};
</script>

<style lang="scss" scoped>
</style>
