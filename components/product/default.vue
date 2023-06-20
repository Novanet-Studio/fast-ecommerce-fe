<template>
  <div class="product">
    <div class="product__thumbnail">
      <product-thumbnail-image />
      <product-actions @quick-view="handleQuickView" />
    </div>
    <div class="product__container">
      <div class="product__content">
        <product-title :id="product.id">{{ product.name }}</product-title>
        <product-price class="!my-1">{{ product.price }}</product-price>
      </div>
    </div>
    <product-modal v-model="state.quickView">
      <product-quick-view />
    </product-modal>
  </div>
</template>
<script lang="ts" setup>
import { injectKeys } from '~/config/constants';

const props = defineProps<{ product: Product }>();

const state = reactive({
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});

provide(injectKeys.product, props.product);

const handleQuickView = (open: boolean) => (state.quickView = open);
</script>

<style scoped>
.product {
  @apply h-full box-border lg:p-[20px_20px_0] max-w-[168px] relative block box-border border border-transparent transition ease hover:(border border-gray-300) lg:max-w-[250px];
}

.product__thumbnail {
  @apply relative overflow-hidden;
}

.product__thumbnail:hover > ul {
  transform: translate(-50%, 0);
}
</style>
