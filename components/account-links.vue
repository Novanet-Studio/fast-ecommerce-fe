<template>
  <ul class="border border-gray-300">
    <li
      class="border-b-2 border-b-gray-300"
      v-for="link in links"
      :key="link.text"
      :class="$route.path.includes(link?.name) ? 'text-yellow-500' : ''"
    >
      <nuxt-link
        :to="link.url"
        class="flex items-center px-5 py-4 font-medium uppercase"
      >
        <span class="mr-3"><component :is="getIcon(link.name)" /></span>
        {{ link.text }}
      </nuxt-link>
    </li>
    <li>
      <a
        class="flex px-5 py-4 items-center font-medium uppercase"
        href="#"
        @click.prevent="handleLogout"
      >
        <!-- <i class="mr-3 icon-power-switch"></i> -->
        <ph-power weight="light" class="mr-3" />
        Cerrar Sesión
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import {
  PhPower,
  PhMapPin,
  PhReceipt,
  PhBag,
  PhHeart,
} from '@phosphor-icons/vue';
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

const getIcon = (icon: string) => {
  const icons: { [key: string]: any } = {
    invoices: PhReceipt,
    address: PhMapPin,
    'shopping-cart': PhBag,
    wishlist: PhHeart,
  };

  return icons[icon];
};
</script>
