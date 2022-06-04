<template>
  <aside class="navigation-drawer" :class="app.appDrawer ? '' : 'navigation-drawer--close'">
    <div class="navigation-drawer__content">
      <panel-menu v-if="app.currentDrawerContent === 'menu'" />
      <panel-categories v-if="app.currentDrawerContent === 'categories'" />
      <panel-shopping-cart v-if="app.currentDrawerContent === 'cart'" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useApp } from '~/store/app';
const app = useApp();
</script>

<style lang="scss" scoped>
.navigation-drawer {
  height: 100%;
  top: 0;
  transform: translateX(-100%);
  width: 100%;
  background-color: #fff;

  display: flex;
  flex-direction: column;
  left: 0;
  overflow: hidden;
  pointer-events: auuto;
  transition: transform, visibility, width cubic-bezier(0.4, 0, 0.2, 1) 0.2s;

  position: fixed;
  z-index: 9999;

  &--close {
    visibility: hidden;
  }

  &__content {
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>