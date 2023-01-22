<template>
  <aside class="flex flex-col">
    <div class="flex flex-row flex-nowrap justify-between items-start pb-5">
      <div class="flex items-center">
        <h3 class="relative text-yellow-400 text-2xl mt-0 mb-2 font-bold">
          Bienvenido {{ auth.user.username }}
        </h3>
      </div>
    </div>
    <div>
      <account-links :breadInfo="breadcrumb" />
    </div>
  </aside>
</template>

<script lang="ts" setup>
type Props = {
  breadcrumb(link: string): void;
};

defineProps<Props>();

const { $store } = useNuxtApp();
const auth = $store.auth();
</script>
