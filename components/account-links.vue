<template>
  <ul class="border border-gray-300">
    <li
      class="border-b-2 border-b-gray-300"
      v-for="link in links"
      :key="link.text"
      :class="$route.path === link?.text ? 'active' : ''"
      :style="{ color: $route.path === link?.text && 'red' }"
    >
      <nuxt-link :to="link.url" class="block px-5 py-4 font-medium uppercase">
        <i class="mr-3" :class="link.icon"></i>
        {{ link.text }}
      </nuxt-link>
    </li>
    <li>
      <a
        class="block px-5 py-4 font-medium uppercase"
        href="#"
        @click.prevent="handleLogout"
      >
        <i class="mr-3 icon-power-switch"></i>
        Cerrar Sesión
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const global = $store.global();
const auth = $store.auth();
const cart = $store.cart();
const router = useRouter();

type Props = {
  breadInfo(path: string): void;
};

defineProps<Props>();

const links = global.getLinks;
const handleLogout = () => {
  auth.authenticated = false;
  cart.clearCart();
  router.push('/');
};
</script>
