<template>
  <div class="ps-breadcrumb">
    <div :class="layout === 'fullwidth' ? 'ps-container' : 'container'">
      <ul class="breadcrumb">
        <template v-for="item in items">
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
type BreadcrumbItem = {
  text?: string;
  url?: string | unknown;
  active?: boolean | unknown;
}

type Props = {
  items?: BreadcrumbItem[];
  layout?: string;
}

withDefaults(defineProps<Props>(), {
  items: null,
  layout: null,
});
</script>
