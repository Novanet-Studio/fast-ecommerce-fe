<template>
  <div class="pb-7 mx-4 lg:container lg:mx-auto">
    <aside class="max-w-full w-full relative pb-5 mb-5">
      <div>
        <h3 class="text-xl mb-[10px] font-bold text-yellow-400">Contáctanos</h3>
        <ul class="mt-7">
          <li v-for="(item, index) in socialNetworks" :key="index" class="relative inline-block mr-[20px] align-top">
            <a class="text-yellow-400 inline-block text-lg" :href="item.link">
              <i :class="item.iconClass"></i>
            </a>
            {{ item.text }}
          </li>
        </ul>
      </div>
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
    text: '+58-412-12345654',
  },
  {
    link: '#',
    iconClass: 'far fa-envelope',
    text: 'fast@ecommerce.com',
  },
]

</script>
