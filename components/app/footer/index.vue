<template>
  <footer class="footer">
    <div class="footer__wrapper">
      <app-footer-widgets />
      <app-footer-copyright />
    </div>
  </footer>
</template>

<style scoped>
.footer {
  @apply pt-20;
}

.footer__wrapper {
  @apply mx-auto px-4 md:(px-8 max-w-full);
}
</style>
