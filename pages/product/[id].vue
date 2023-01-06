<template>
  <div class="martfury">
    <bread-crumb :items="state.breadCrumb" layout="fullwidth" />
    <div class="ps-page--product">
      <div class="ps-container">
        <div class="ps-page__container">
          <div class="ps-page__left">
            <product-detail-fullwidth
              v-if="state.product"
              :product="state.product"
            />
          </div>
          <div class="ps-page__right"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { getProductById as GetProductById } from '~/graphql';

definePageMeta({
  pageTransition: {
    name: 'zoom',
  },
});

const { $store, $helpers, $notify } = useNuxtApp();
const graphql = useStrapiGraphQL();
const route = useRoute();
const global = $store.global();

const state = reactive({
  productId: route.params.id,
  breadCrumb: null,
  pageLoading: true,
  product: null,
});

state.breadCrumb = [
  {
    text: 'Volver',
    url: '/',
  },
];

const loadProductById = async () => {
  state.pageLoading = true;

  const [{ data }, error] = await $helpers.handleAsync(
    graphql<ProductsResponse>(GetProductById, {
      id: state.productId,
    })
  );

  if (error?.message) {
    $notify({
      group: 'all',
      title: 'Error',
      text: 'Hubo un problema al intentar cargar el producto',
    });
    state.pageLoading = false;
    return;
  }

  state.product = data.products.data[0];
};

onMounted(() => {
  loadProductById();
  global.appDrawer = false;
});
</script>
