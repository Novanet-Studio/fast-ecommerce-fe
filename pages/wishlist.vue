<template>
  <section>
    <!-- <bread-crumb :items="breadCrumb" /> -->
    <wish-list-content />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  layoutTransition: {
    name: 'zoom',
  },
  pageTransition: {
    name: 'zoom',
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
