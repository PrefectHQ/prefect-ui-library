<template>
  <div class="row-grid-layout" :class="classes.root">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useActiveViewMode } from '@/utilities/artifactsViewMode'

  const { activeViewMode } = useActiveViewMode()

  const classes = computed(() => {
    return {
      root: {
        'flow-run-results__list--grid': activeViewMode.value === 'grid',
        'flow-run-results__list--rows': activeViewMode.value === 'rows',
      },
    }
  })
</script>

<style>
.row-grid-layout { @apply
  flex
  flex-col
  gap-4
}

.row-grid-layout--grid { @apply
  grid
  gap-4;

  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
}

.row-grid-layout--rows { @apply
  flex
  flex-col
  gap-4
}
</style>