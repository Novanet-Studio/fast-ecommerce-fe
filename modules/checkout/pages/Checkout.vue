<template>
  <div>
    <!-- <header-default /> -->
    <section class="ps-page--my-account">
      <bread-crumb :breadcrumb="breadCrumb" />
      <notifications group="all" :duration="2000" :width="300" animation-name="fade-left" position="top right">
        <template #body="props">
          <div class="ps-notify" :class="props.className">
            <button class="ps-notify__close" @click="props.close">
              <i class="icon icon-cross"></i>
            </button>
            <div class="ps-notify__header">
              <span>{{ props.item.title }}</span>
            </div>
            <div class="ps-notify__content">
              <p>{{ props.item.text }}</p>
            </div>
          </div>
        </template>
      </notifications>
      <checkout-content />
    </section>
    <!-- <footer-fullwidth /> -->
  </div>
</template>

<script>
definePageMeta({
  // TODO: add authentication middleware
  // middleware: 'authentication'
  // transition: 'zoom'
});

const breadCrumb = ref([
  {
    text: 'Inicio',
    url: '/'
  },
  {
    text: 'Carrito de compra',
    url: '/shopping-cart'
  },
  {
    text: 'Información de compra'
  }
]);

</script>
