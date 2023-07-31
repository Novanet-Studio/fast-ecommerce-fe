<template>
  <ul class="border border-gray-300">
    <li
      class="border-b-2 last:border-b-gray-300"
      v-for="link in links"
      :key="link.text"
      :class="hasText(link?.name) ? 'text-color-2' : ''"
    >
      <nuxt-link
        :to="link.url"
        class="flex items-center px-5 py-4"
        :class="hasText(link?.name) ? 'font-bold' : 'font-medium'"
      >
        <div class="mr-3" :class="hasText(link.name) ? getIcon(link.name).active : getIcon(link.name).inactive" />
        {{ link.text }}
      </nuxt-link>
    </li>
    <li>
      <a
        class="flex px-5 py-4 items-center font-medium"
        href="#"
        @click.prevent="handleLogout"
      >
        <div class="i-ph-power-light mr-3" />
        Cerrar Sesión
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
const global = useGlobalStore();
const auth = useAuthStore();
const cart = useCartStore();
const router = useRouter();
const route = useRoute();

const links = global.links;
const hasText = (text: string) => route.path.includes(text);

const handleLogout = () => {
  auth.authenticated = false;
  cart.clear();
  router.push('/');
};

const getIcon = (icon: string) => {
  const icons: { [key: string]: any } = {
    invoices: {
      active: 'i-ph-receipt-fill',
      inactive: 'i-ph-receipt-light',
    },
    address: {
      active: 'i-ph-map-pin-fill',
      inactive: 'i-ph-map-pin-light',
    },
    'shopping-cart': {
      active: 'i-ph-bag-fill',
      inactive: 'i-ph-bag-light',
    },
    wishlist: {
      active: 'i-ph-heart-fill',
      inactive: 'i-ph-heart-light',
    },
  };

  return icons[icon];
};
</script>
