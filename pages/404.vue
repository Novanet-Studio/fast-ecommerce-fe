<template>
  <div class="ps-page--single">
    <div class="ps-page--404">
      <div class="container">
        <div class="ps-section__content">
          <figure>
            <nuxt-img src="/404.jpg" alt="" />
            <h3>Ohh! Page not found</h3>
            <p>
              It seems we can't find what you're looking for. Perhaps searching
              can help or go back to
              <nuxt-link class="text-black" to="/"> Homepage </nuxt-link>
            </p>
          </figure>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: false,
});
</script>

<style scoped>
.text-black {
  color: #e36d65;
}
</style>
