<template>
  <div class="product h-full">
    <div class="product__thumbnail h-2/3">
      <product-thumbnail-image :product="product" />
      <product-actions :product="product" @quick-view="handleQuickView" />
    </div>
    <div class="product__container">
      <div class="product__content">
        <product-title :product="product" />
        <product-price class="!my-1" :product="product" />
      </div>
    </div>
    <modal v-model="state.quickView">
      <div class="product-modal">
        <a class="product-modal__icon" @click="state.quickView = false">
          <i class="icon icon-cross"></i
        ></a>
        <product-quick-view :product="product" />
      </div>
    </modal>
  </div>
</template>
<script lang="ts" setup>
defineProps<{ product: ProductsMapped }>();

const state = reactive({
  rating: 5,
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});

const handleQuickView = (open: boolean) => (state.quickView = open);
</script>
