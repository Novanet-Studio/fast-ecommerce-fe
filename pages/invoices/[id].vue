<script lang="ts" setup>
definePageMeta({
  layout: 'account',
  middleware: 'authentication',
});
</script>

<template>
  <section class="ml-2 w-full">
    <invoices-detail />
  </section>
</template>
