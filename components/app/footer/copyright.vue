<template>
  <div class="copyright">
    <p class="copyright__site">
      fast-ecommerce.com - {{ new Date().getFullYear() }}
    </p>

    <p class="copyright__payment">
      <span class="copyright__payment-title"
        >Sus pagos están protegidos con:</span
      >
      <a href="https://squareup.com/es/es">
        <img src="/img/square-logo.svg" alt="SquareUp logo" />
      </a>
    </p>
    <p class="copyright__author">
      <span class="copyright__author-text">Tienda realizada por:</span>
      <a href="https://novanet.studio/">
        <img src="/img/novanet-logo.svg" alt="Novanet logo" />
      </a>
    </p>
  </div>
</template>

<style scoped>
.copyright {
  @apply py-9 flex flex-wrap justify-between border-t border-t-light-200 text-center lg:(flex-row);
}

.copyright__site {
  @apply block w-full mb-0 leading-8 text-sm lg:w-auto;
}

.copyright__payment {
  @apply flex flex-col items-center w-full !mb-0 leading-8 text-sm lg:(flex-row w-auto);
}

.copyright__payment-title {
  @apply block pb-[10px] lg:(pb-0 pr-2);
}

.copyright__author {
  @apply flex items-center justify-center w-full mb-0 leading-8 text-sm lg:w-auto;
}

.copyright__author-text {
  @apply mr-2;
}
</style>
