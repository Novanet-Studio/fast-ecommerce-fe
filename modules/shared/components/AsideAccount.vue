<template>
  <aside class="ps-widget--account-dashboard">
    <div class="ps-widget__header">
      <div>
        <h3>Hola</h3>
        <p>{{ auth.user.username }}</p>
      </div>
    </div>
    <div class="ps-widget__content">
      <AccountLinks :breadInfo="dynamicBreadcrumb" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
import { useAuth } from '~/store/auth';

const auth = useAuth();

type Props = {
  dynamicBreadcrumb(link: string): string;
};

defineProps<Props>();
</script>
