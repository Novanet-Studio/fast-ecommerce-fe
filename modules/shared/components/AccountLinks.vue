<template>
  <ul>
    <li v-for="link in links" :key="link.text" :class="$route.path === link?.text ? 'active' : ''"
      @click="breadInfo(link.text)">
      <nuxt-link :to="link.url">
        <i :class="link.icon"></i>
        {{ link.text }}
      </nuxt-link>
    </li>
    <li>
      <a href="#" @click.prevent="handleLogout">
        <i class="icon-power-switch"></i>
        Cerrar Sesión
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useApp } from "~/store/app";
import { useAuth } from "~/store/auth";

const app = useApp();
const auth = useAuth();
const router = useRouter();

type Props = {
  breadInfo(path: string): string;
}

defineProps<Props>();

const links = app.getLinks;
const handleLogout = () => {
  auth.isLoggedIn = false;
  router.push('/');
}

// import { mapGetters } from 'vuex';
// export default {
//   name: 'AccountLinks',
//   props: [
//     'breadinfo'
//   ],
//   computed: {
//     ...mapGetters({
//       links: 'app/getLinks'
//     })
//   },
//   methods: {
//     idk(name) {
//       const nameLink = name;
//       this.breadinfo(nameLink)
//     },
//     handleLogout() {
//       this.$store.dispatch('auth/setAuthStatus', false);
//       this.$router.push('/');
//     }
//   }

// };
</script>
