<template>
  <div>
  <client-only>
    <div class="account">
      <div class="account__wrapper">
        <div class="account__main">
          <div class="account__main-wrapper">
            <app-header />
            <section class="account__section">
              <div class="account__section-wrapper">
                <div class="account__section-container">
                  <div class="account__aside">
                    <div>
                      <aside-account :breadcrumb="dynamicBreadcrumb" />
                    </div>
                  </div>
                  <div class="account__content">
                    <nuxt-page />
                  </div>
                </div>
              </div>
            </section>
            <app-footer />
            <!-- <navigation-list /> -->
            <notify />
          </div>
        </div>
      </div>
    </div>
  </client-only>
</div>
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
  },
]);

const accountRoutes = ['/shopping-cart', '/checkout'];

const dynamicBreadcrumb = (path: string): void => {
  if (!accountRoutes.includes(route.path)) {
    breadCrumb.value[1].text = path;
  }
};

onMounted(() => {
  // TODO: check why this logic
  if (!accountRoutes.includes(route.path)) {
    // 📝 why this name?
    const routePath = global.getLinks.find((item) => item.url === route.path);
    breadCrumb.value[1].text = routePath?.text || '';
  }
});
</script>
