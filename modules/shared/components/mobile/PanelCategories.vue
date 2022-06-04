<template>
  <div class="ps-panel--sidebar">
    <div class="ps-panel__header">
      <h3>Categorias</h3>
      <a href="#" class="ps-panel__close" @click.prevent="handleClosePanel">
        <i class="icon icon-cross"></i>
      </a>
    </div>
    <div class="navigation__content">
      <ul class="menu--mobile">
        <li v-for="category in categories">
          <!-- <nuxt-link to="/shop">{{ category.attributes.name }}</nuxt-link> -->
          <p>{{ category.attributes.name }}</p>

        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '~/store/app';

const app = useApp();
const categories = ref();

const handleClosePanel = () => {
  app.currentDrawerContent = null;
  app.appDrawer = false;
}

onMounted(() => {
  // TODO: load categories from store/datatabase
  categories.value = [];
})
</script>

<style lang="scss" scoped>
.menu--mobile {
  li {
    p {
      padding: 10px 10px;
      margin-bottom: 0px;
      font-size: 17px;
    }
  }
}
</style>
