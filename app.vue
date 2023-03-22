<template>
  <nuxt-layout>
    <nuxt-page />
  </nuxt-layout>
</template>

<script lang="ts" setup>
const token = useStrapiToken();
const { setToken, setUser } = useStrapiAuth();
const { $store } = useNuxtApp();
const auth = $store.auth();

onMounted(() => {
  if (token.value) return;
  if (!auth.token) return;

  setToken(auth.token);
  setUser({
    ...auth.user,
    id: +auth.user.id,
  });
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
