<template>
  <div class="py-[6.25rem]">
    <div class="w-full px-3 mx-auto md:max-w-4xl lg:max-w-6xl">
      <div class="mb-12 text-center md:pb-[6.25rem]">
        <h1 class="text-2xl font-semibold text-yellow-400 md:text-5xl">Informacion de facturación</h1>
      </div>
      <div class="flex flex-col gap-8 md:flex-row">
        <div class="flex-[0_0_100%] md:flex-[0_0_65%]">
          <checkout-information-form />
        </div>
        <div class="flex-[0_0_100%] md:flex-[0_0_35%]">
          <order-summary />
        </div>
      </div>
    </div>
  </div>
</template>
