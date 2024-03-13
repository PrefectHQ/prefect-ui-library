<template>
  <template v-if="empty">
    <slot name="empty" />
  </template>
  <p-virtual-scroller v-else class="row-grid-layout-list" :items="props.items" :class="classes.root">
    <template #default="{ item }">
      <slot :item="item" />
    </template>
  </p-virtual-scroller>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { activeViewMode } from '@/utilities/activeViewMode'

  const props = defineProps<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    items: any[],
  }>()

  const empty = computed(() => props.items.length === 0)

  const classes = computed(() => {
    return {
      root: {
        'row-grid-layout-list--grid': !empty.value && activeViewMode.value === 'grid',
        'row-grid-layout-list--rows': !empty.value && activeViewMode.value === 'rows',
      },
    }
  })
</script>

<style>
.row-grid-layout-list .p-virtual-scroller-chunk { @apply
  flex
  flex-col
  gap-4
  min-w-0
}

.row-grid-layout-list--grid .p-virtual-scroller-chunk { @apply
  grid
  gap-4;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.row-grid-layout-list--rows .p-virtual-scroller-chunk { @apply
  flex
  flex-col
  gap-4
}
</style>