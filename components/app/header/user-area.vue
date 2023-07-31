<template>
  <div v-if="!auth.authenticated" class="user-area">
    <div class="user-area__icon-wrapper">
      <nuxt-link to="/login">
        <ph-user class="user-area__icon" weight="light" />
      </nuxt-link>
    </div>

    <div class="user-area__links-group">
      <nuxt-link to="/auth/login" class="user-area__link">Ingresar</nuxt-link>
      <nuxt-link to="/auth/register" class="user-area__link"
        >Registro</nuxt-link
      >
    </div>
  </div>
  <div
    v-else
    class="user-area__menu"
    @click="isOpen = !isOpen"
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <div class="i-ph-user-light user-area__icon" />
    <transition name="slide-fade">
      <div class="user-area__menu-container" v-if="isOpen">
        <ul class="user-area__menu-list">
          <li
            v-for="link in global?.links"
            :key="link.text"
            class="user-area__menu-list-item"
          >
            <nuxt-link :to="link.url" class="user-area__menu-link">
              {{ link.text }}
            </nuxt-link>
          </li>
          <li class="user-area__menu-logout">
            <a
              href="#"
              class="transition-colors ease"
              @click.prevent="handleLogout"
            >
              Cerrar Sesión
            </a>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script lang="ts" setup>
const auth = useAuthStore();
const global = useGlobalStore();
const cart = useCartStore();
const product = useProductStore();
const router = useRouter();

const isOpen = ref(false);

const handleLogout = () => {
  auth.$reset();
  cart.$reset();
  product.$reset();
  router.push({
    path: '/',
    force: true,
  });
};
</script>

<style scoped>
.user-area {
  @apply mx-5 flex flex-nowrap text-left cursor-pointer;
}

.user-area__links-group {
  @apply pl-[10px];
}

.user-area__link {
  @apply block font-bold text-sm;
}

.user-area__menu {
  @apply mx-5 relative cursor-pointer;
}

.user-area__menu-container {
  @apply absolute min-w-[240px] right-0 z-30 pt-[10px] opacity-100 bg-white px-4 py-2 rounded-sm transition ease opacity-100 lg:p-4;
}

.user-area__icon {
  @apply text-4xl;
}

.user-area__menu-list {
  @apply;
}

.user-area__menu-list-item {
  @apply mb-5 transition hover:(text-yellow-400 font-bold);
}

.user-area__menu-link {
  @apply pl-0 text-dark-500 transition-colors ease;
}

.user-area__menu-logout {
  @apply pt-[10px] mb-0 border-t border-t-gray-200;
}

.user-area__icon-wrapper {
  @apply flex flex-nowrap items-center;
}
</style>
