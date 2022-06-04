<template>
  <section class="ps-page--my-account">
    <bread-crumb :breadcrumb="breadCrumb" />
    <compare-content />
  </section>
</template>

<script>
import { useCompare } from '~/store/compare';
import { useProduct } from '~/store/product';

definePageMeta({
  layout: 'layout-account',
  // transition: 'zoom',
});

const compare = useCompare();
const product = useProduct();
const breadCrumb = ref([
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'Compare'
  }
]);

onMounted(async () => {
  if (!compare) return;

  const itemsId = compare.items.map((item) => item.id);
  if (!itemsId.length) return;

  await product.getCompareProducts(itemsId);
});
</script>
