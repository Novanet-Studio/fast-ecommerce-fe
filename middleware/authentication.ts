export default defineNuxtRouteMiddleware(() => {
  const auth = useAuthStore();
  if (!auth.authenticated) {
    return navigateTo('/auth/login');
  }
});
