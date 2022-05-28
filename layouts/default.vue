<template>
  <div>
    <header>
      Ecommerce App
      <div>
        <nuxt-link to="/">Home</nuxt-link> |
        <nuxt-link to="/product">Product</nuxt-link>
      </div>
    </header>
    <main>
      <slot />
    </main>
  </div>
</template>