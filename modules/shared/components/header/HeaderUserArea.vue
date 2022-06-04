<template>
  <div v-if="!isLoggedIn" class="ps-block--user-header">
    <div class="ps-block__left">
      <nuxt-link to="/login">
        <i class="icon-user"></i>
      </nuxt-link>
    </div>

    <div class="ps-block__right">
      <nuxt-link to="/login">
        Iniciar Sesión
      </nuxt-link>
      <nuxt-link to="/register">
        Registro
      </nuxt-link>
    </div>
  </div>
  <div v-else class="ps-block--user-account">
    <i class="icon-user"></i>
    <div class="ps-block__content">
      <ul class="ps-list--arrow">
        <li v-for="link in accountLinks" :key="link.text">
          <nuxt-link :to="link.url">
            {{ link.text }}
          </nuxt-link>
        </li>
        <li class="ps-block__footer">
          <a href="#" @click.prevent="handleLogout">
            Cerrar Sesión
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useAuth } from '~/store/auth';
import { useApp } from '~/store/app';

const auth = useAuth();
const app = useApp();

const isLoggedIn = computed(() => auth.isLoggedIn);
const accountLinks = computed(() => app.getLinks);

const handleLogout = () => auth.isLoggedIn = false;
</script>
