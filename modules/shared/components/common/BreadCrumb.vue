<template>
  <div class="ps-breadcrumb">
    <div :class="layout === 'fullwidth' ? 'ps-container' : 'container'">
      <ul class="breadcrumb">
        <template v-for="item in breadcrumb">
          <li v-if="item.url" :key="item.text">
            <nuxt-link :to="item.url">
              <a>{{ item.text }}</a>
            </nuxt-link>
          </li>
          <li v-else>{{ item.text }}</li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
type Breadcrumb = {
  text: string;
  url: string;
}

type Props = {
  breadcrumb?: Breadcrumb[];
  layout?: string;
}

withDefaults(defineProps<Props>(), {
  breadcrumb: null,
  layout: null,
});
</script>
