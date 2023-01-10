<template>
  <div class="invoices">
    <invoices-content />
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  middleware: 'authentication',
  pageTransition: {
    name: 'zoom',
  },
  layoutTransition: {
    name: 'zoom',
  },
});
</script>
