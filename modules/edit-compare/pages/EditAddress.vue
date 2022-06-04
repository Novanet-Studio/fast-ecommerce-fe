<template>
  <section v-if="type" class="ps-page--my-account">
    <edit-address-content :type="type" />
    <!-- 📝 Why this component is repeated? -->
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
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'layout-account',
  // transition: 'zoom',
  // middleware: 'authentication',
});

const route = useRoute();
const router = useRouter();
const breadCrumb = ref([
  {
    text: 'Home',
    url: '/'
  },
  {
    text: 'Edit Address'
  }
]);

const type = computed(() => {
  const type = route.fullPath.split('?')[1];

  if (type === 'add=bill' || type === 'add=shipp') {
    return type;
  }

  return type;
});
</script>
