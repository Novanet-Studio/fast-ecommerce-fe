<template>
  <div v-if="!auth.authenticated" class="user-area">
    <div class="user-area__icon-wrapper">
      <nuxt-link to="/login">
        <i class="user-area__icon icon-user"></i>
      </nuxt-link>
    </div>

    <div class="user-area__links-group">
      <nuxt-link to="/login" class="user-area__link">Ingresar</nuxt-link>
      <nuxt-link to="/register" class="user-area__link">Registro</nuxt-link>
    </div>
  </div>
  <div
    v-else
    class="user-area__menu"
    @click="isOpen = !isOpen"
    @mouseover="isOpen = true"
    @mouseleave="isOpen = false"
  >
    <i class="user-area__icon icon-user"></i>
    <div class="user-area__menu-container" v-if="isOpen">
      <ul class="user-area__menu-list">
        <li
          v-for="link in global?.getLinks"
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
            class="transition-colors ease hover:text-yellow-400"
            @click.prevent="handleLogout"
          >
            Cerrar Sesión
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
const { $store } = useNuxtApp();
const auth = $store.auth();
const global = $store.global();
const router = useRouter();

const isOpen = ref(false);

const handleLogout = () => {
  auth.reset();
  router.go(0);
};
</script>
