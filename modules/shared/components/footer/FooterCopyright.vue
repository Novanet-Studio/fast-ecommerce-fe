<template>
  <div class="py-9 flex flex-wrap justify-between border-t border-t-light-200 text-center lg:(flex-row)">
    <p class="block w-full mb-0 leading-8 text-sm lg:w-auto">fast-ecommerce.com - {{ new Date().getFullYear() }}</p>

    <p class="flex flex-col items-center w-full !mb-0 leading-8 text-sm lg:(flex-row w-auto)">
      <span class="block pb-[10px] lg:(pb-0 pr-2)">Sus pagos están protegidos con:</span>
      <a href="https://squareup.com/es/es">
        <img src="/img/square-logo.svg" alt="SquareUp logo" />
      </a>
    </p>
    <p class="flex items-center justify-center w-full mb-0 leading-8 text-sm lg:w-auto">
      <span class="mr-2">Tienda realizada por:</span>
      <a href="https://novanet.studio/">
        <img src="/img/novanet-logo.svg" alt="Novanet logo" />
      </a>
    </p>
  </div>
</template>
