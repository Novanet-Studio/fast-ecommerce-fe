<template>
  <div>
    <addresses-content />
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
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  // TODO: Nuxt3 transition
  // transition: 'zoom',
  // TODO: add authentication middleware
  // middleware: 'authentication'
});
</script>

