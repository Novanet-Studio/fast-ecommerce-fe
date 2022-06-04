<template >
  <div class="ps-product">
    <div class="ps-product__thumbnail">
      <product-thumbnail-image :product="product" />
      <div v-if="isSale === true" class="ps-product__badge">Sale</div>
      <product-actions :product="product" @quick-view="handleQuickView" />
    </div>
    <div class="ps-product__container">
      <div class="ps-product__content">
        <product-title :product="product" />
        <div class="ps-product__rating">
          <rating />
        </div>
        <product-price :product="product" />
      </div>
      <div class="ps-product__content hover">
        <product-title :product="product" />
        <product-price :product="product" />
      </div>
    </div>
    <!-- TODO: Dialog component -->
    <!-- <v-dialog v-model="state.quickView" width="1200">
      <div class="ps-dialog">
        <a class="ps-dialog__close" @click.prevent="state.quickView = false" href="">
          <i class="icon icon-cross"></i>
        </a>
        <product-quickview :product="product" />
      </div>
    </v-dialog> -->
  </div>
</template>
<script lang="ts" setup>

type Props = {
  product: {
    id: string;
    quantity: number;
    price: number;
    sale: boolean;
  } | any;
}

const props = defineProps<Props>();
const isSale = computed(() => props.product.sale);
const state = reactive({
  rating: 5,
  modal: false,
  preload: false,
  isImageLoaded: false,
  quickView: false,
});


const handleQuickView = (open: boolean) => state.quickView = open;

</script>
