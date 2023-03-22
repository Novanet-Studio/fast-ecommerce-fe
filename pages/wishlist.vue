<template>
  <section>
    <!-- <bread-crumb :items="breadCrumb" /> -->
    <wish-list-content />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  pageTransition: {
    name: 'page',
  },
});

// const breadCrumb = ref([
//   {
//     text: 'Inicio',
//     url: '/',
//   },
//   {
//     text: 'List de deseos',
//   }
// ]);
</script>
