<template>
  <div class="martfury">
    <bread-crumb :breadcrumb="state.breadCrumb" layout="fullwidth" />
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
    <div class="ps-page--product">
      <div class="ps-container">
        <div class="ps-page__container">
          <div class="ps-page__left">
            <product-detail-fullwidth v-if="product" :product="product" />
          </div>
          <div class="ps-page__right">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useApp } from '~/store/app';

type Props = {
  product: any;
}

defineProps<Props>();

definePageMeta({
  layout: 'layout-account',
  // transition: 'zoom',
});


const route = useRoute();
const app = useApp();

const state = reactive({
  productId: route.params.id,
  breadCrumb: null,
  pageLoading: true,
  product: null,
});

onMounted(() => {
  // Why this?
  setTimeout(() => state.pageLoading = false, 2000);

  state.breadCrumb = [
    {
      text: 'Volver',
      url: '/',
    },
  ];
  app.appDrawer = false;
  // get product by id
  state.product = {};

});
</script>
