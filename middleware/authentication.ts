export default defineNuxtRouteMiddleware(() => {
  const { $store } = useNuxtApp();
  const auth = $store.auth();
  if (!auth.authenticated) {
    return navigateTo('/auth/login');
  }
});
