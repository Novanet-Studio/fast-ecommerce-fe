<template>
  <div class="widgets">
    <aside class="widgets__wrapper">
      <h3 class="widgets__title">Contáctanos</h3>
      <ul class="widgets__list">
        <li
          v-for="(item, index) in socialNetworks"
          :key="index"
          class="widgets__item"
        >
          <a class="widgets__link" :href="item.link">
            <i :class="item.iconClass"></i>
          </a>
          {{ item.text }}
        </li>
      </ul>
    </aside>
  </div>
</template>

<script lang="ts" setup>
const socialNetworks = [
  {
    link: 'https://www.instagram.com/fast-ecommerce/',
    iconClass: 'fab fa-instagram',
    text: '@fast-ecommerce',
  },
  {
    link: 'https://www.facebook.com/people/fast-ecommerce',
    iconClass: 'fa-brands fa-facebook',
    text: 'fast-ecommerce',
  },
  {
    link: '#',
    iconClass: 'fa-brands fa-whatsapp',
    text: '+58 412-12345654',
  },
  {
    link: '#',
    iconClass: 'far fa-envelope',
    text: 'fast@ecommerce.com',
  },
];
</script>
