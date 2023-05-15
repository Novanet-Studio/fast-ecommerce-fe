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

<style scoped>
.account {
  @apply flex relative;
}

.account__wrapper {
  @apply flex-auto backface-hidden flex flex-col min-h-screen max-w-full relative;
}

.account__main {
  @apply flex flex-[1_0_auto] max-w-full transition animate-ease-[cubic-bezier(0.4,0,0.2,1)];
}

.account__main-wrapper {
  @apply flex-auto max-w-full relative;
}

.account__section {
  @apply pt-12 min-h-screen;
}

.account__section-wrapper {
  @apply max-w-sm p-3 mx-auto flex sm:max-w-lg md:max-w-xl lg:(px-52 max-w-full);
}

.account__section-container {
  @apply pt-12 min-h-screen;
}

.account__section-container {
  @apply flex flex-wrap flex-auto -m-3;
}

.account__aside {
  @apply flex-[1_1_100%] mb-8 lg:(flex-[0_0_33.333333%] mb-8);
}

.account__content {
  @apply flex-[0_0_100%] flex lg:flex-[0_0_66.666666%];
}
</style>
