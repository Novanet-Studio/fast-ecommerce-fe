<template>
  <section class="mx-6 mx-auto">
    <invoices-detail />
    <notify />
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
  pageTransition: {
    name: 'page',
  },
  layoutTransition: {
    name: 'page',
  },
});
</script>
