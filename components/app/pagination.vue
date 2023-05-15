<template>
  <div class="paginator-container">
    <a
      @click.prevent="setPage(activePage > 1 ? activePage - 1 : 1)"
      class="paginator-item paginator-item-prev"
      :class="{ disabled: activePage === 1 || disabled }"
    >
      <slot name="prev-button">&lsaquo;</slot>
    </a>

    <div class="paginator-items">
      <a
        v-for="p in pages"
        :key="p.id"
        class="paginator-item"
        :class="{
          active: activePage === p.n,
          space: p.n === space,
          disabled,
        }"
        @click.prevent="setPage(p.n)"
      >
        {{ p.n }}
      </a>
    </div>

    <a
      @click.prevent="
        setPage(
          activePage < pages[pages.length - 1].n
            ? activePage + 1
            : pages[pages.length - 1].n
        )
      "
      class="paginator-item paginator-item-next"
      :class="{
        disabled: activePage === pages[pages.length - 1].n || disabled,
      }"
    >
      <slot name="next-button">&rsaquo;</slot>
    </a>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  currentPage: number;
  perPage?: number;
  total?: number;
  space?: string;
  disabled?: boolean;
}

interface Emits {
  (e: 'change', page: number): void;
}

const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  perPage: 10,
  total: 20,
  space: '...',
  disabled: false,
});

const emit = defineEmits<Emits>();

const activePage = ref(props.currentPage);

const pages = computed(() => {
  const $pages = [];
  const edge = 3;
  const count = Math.ceil(props.total / props.perPage);

  for (let i = 1; i <= count; i++) {
    const _distance = Math.abs(i - activePage.value);

    if (
      i === 1 ||
      i === count ||
      _distance < edge ||
      (_distance === edge && _distance === count - 2)
    ) {
      $pages.push({
        id: i,
        n: i,
      });
    } else if (_distance === edge) {
      $pages.push({
        id: i,
        n: props.space,
      });
    }
  }
  return $pages;
});

function setPage(page: number | string): void {
  if (isNaN(page as number) || page === Number(activePage.value)) return;
  activePage.value = page as number;
  emit('change', Number(page));
}

watch(activePage, (newVal, oldVal) => {
  if (newVal !== oldVal)
    activePage.value = parseInt(newVal as unknown as string);
});
</script>

<style>
:root {
  --primary-color: #e4c749;
  --pg-item-width: 40px;
  --pg-item-height: 40px;
  --pg-item-border-radius: 50%;
  --pg-item-distance: 5px;
}
.paginator-container {
  display: flex;
  align-items: center;
  gap: var(--pg-item-distance);
}
.paginator-items {
  display: flex;
  gap: var(--pg-item-distance);
}
.paginator-item {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: var(--pg-item-width);
  height: var(--pg-item-height);
  border-radius: var(--pg-item-border-radius);
}
.paginator-item.active {
  background: var(--primary-color);
  color: #fff;
}
.paginator-item:not(.active, .space):active {
  color: var(--primary-color);
}
.paginator-item:not(.disabled, .space) {
  cursor: pointer;
  opacity: 1;
}
.paginator-item.disabled {
  opacity: 0.3;
}
</style>
