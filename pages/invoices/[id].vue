<template>
  <div>
    <invoices-detail />
    <notify />
  </div>
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
