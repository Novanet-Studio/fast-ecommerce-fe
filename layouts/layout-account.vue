<template>
  <client-only>
    <div class="flex relative">
      <div class="flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative">
        <div class="flex flex-[1_0_auto] max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)]">
          <div class="flex-auto max-w-full relative">
            <the-header />
            <section class="pt-12 min-h-screen">
              <!-- container -->
              <div class="max-w-sm p-3 mx-auto flex sm:max-w-lg md:max-w-xl lg:max-w-7xl">
                <div class="flex flex-wrap flex-auto -m-3">
                  <div class="flex-[1_1_100%] mb-8 lg:(flex-[0_0_33.333333%] mb-8)">
                    <div>
                      <aside-account :breadcrumb="dynamicBreadcrumb" />
                    </div>
                  </div>
                  <div class="flex-[0_0_100%] flex lg:flex-[0_0_66.666666%]">
                    <nuxt-page />
                  </div>
                </div>
              </div>
            </section>
            <footer />
            <!-- <navigation-list /> -->
            <notify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const route = useRoute();
const global = $store.global();

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

const dynamicBreadcrumb = (path: string): void => {
  if (!accountRoutes.includes(route.path)) {
    breadCrumb.value[1].text = path;
  }
}

onMounted(() => {
  // TODO: check why this logic
  if (!accountRoutes.includes(route.path)) {
    // 📝 why this name?
    const routePath = global.getLinks.find((item) => item.url === route.path);
    breadCrumb.value[1].text = routePath.text;
  }
})

</script>

<style lang="scss" scoped>
// This styles are copied from farine-frontend (v-app, v-main)
/* .layout-app {
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
} */
</style>