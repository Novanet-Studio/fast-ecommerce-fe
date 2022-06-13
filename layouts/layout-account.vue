<template>
  <client-only>
    <div class="layout-app">
      <div class="layout-app--wrapper">
        <div class="layout-main">
          <div class="layout-main--wrapper">
            <the-header />
            <section class="ps-my-account ps-page--account">
              <div class="container">
                <div class="row">
                  <div class="col-lg-4">
                    <div class="ps-section__left">
                      <aside-account :bread="dynamicBreadcrumb" />
                    </div>
                  </div>
                  <div class="col-lg-8">
                    <nuxt-page />
                  </div>
                </div>
              </div>
            </section>
            <the-footer />
            <navigation-list />
            <notify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
import { useApp } from '~/store/app';

const route = useRoute();
const app = useApp();

const breadCrumb = ref([
  {
    text: '/Home',
    url: '/',
  },
  {
    text: '',
  }
]);

const accountRoutes = ['/shopping-cart', '/checkout'];

const dynamicBreadcrumb = (path: string) => {
  if (!accountRoutes.includes(route.path)) {
    breadCrumb.value[1].text = path;
  }
}

onMounted(() => {
  // TODO: check why this logic
  if (!accountRoutes.includes(route.path)) {
    // 📝 why this name?
    const firstClick = app.getLinks.find((item) => item.url === route.path);
    breadCrumb.value[1].text = firstClick.text;
  }
})

</script>

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