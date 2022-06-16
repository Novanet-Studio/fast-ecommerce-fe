<template>
  <div v-if="!auth.authenticated" class="mx-5 flex flex-nowrap text-left cursor-pointer">
    <div class="flex flex-nowrap items-center">
      <nuxt-link to="/login">
        <i class="icon-user text-3xl text-black"></i>
      </nuxt-link>
    </div>

    <div class="pl-[10px]">
      <nuxt-link to="/login" class="block font-bold text-sm">
        Ingresar
      </nuxt-link>
      <nuxt-link to="/register" class="block font-bold text-sm">
        Registro
      </nuxt-link>
    </div>
  </div>
  <div v-else class="mx-5 relative cursor-pointer" @click="isOpen = !isOpen" @mouseover="isOpen = true"
    @mouseleave="isOpen = false">
    <i class="icon-user text-3xl"></i>
    <div
      class="ps-block__content absolute min-w-[240px] right-0 z-30 pt-[10px] opacity-100 bg-white px-4 py-2 rounded-sm transition ease opacity-100"
      v-if="isOpen">
      <ul class="ps-list--arrow">
        <li v-for="link in global?.getLinks" :key="link.text" class="mb-5">
          <nuxt-link :to="link.url" class="pl-0 text-dark-500">
            {{ link.text }}
          </nuxt-link>
        </li>
        <li class="pt-[10px] mb-0 border-t border-t-gray-200">
          <a href="#" @click.prevent="handleLogout">
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

const isOpen = ref(false);

const handleLogout = () => auth.authenticated = false;
</script>
