<template>
  <div class="row-grid-layout-list" :class="classes.root">
    <template v-for="item in props.items" :key="item.id">
      <slot :item="item" />
    </template>

    <template v-if="empty">
      <slot name="empty" />
    </template>
  </div>
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
.row-grid-layout-list { @apply
  flex
  flex-col
  gap-4
  min-w-0
}

.row-grid-layout-list--grid { @apply
  grid
  gap-4;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.row-grid-layout-list--rows { @apply
  flex
  flex-col
  gap-4
}
</style>