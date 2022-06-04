<template>
  <client-only>
    <div class="layout-app">
      <div class="layout-app--wrapper">
        <div class="layout-main">
          <div class="layout-main--wrapper">
            <the-header />
            <nuxt-page />
            <the-footer />
            <navigation-list />
            <notify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<style lang="scss" scoped>
// This styles are copied from farine-frontend (v-app, v-main)
.layout-app {
  display: flex;
  position: relative;
}

.layout-app--wrapper {
  flex: 1 1 auto;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
}

.layout-main {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  transition: 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.layout-main--wrapper {
  flex: 1 1 auto;
  max-width: 100%;
  position: relative;
}
</style>