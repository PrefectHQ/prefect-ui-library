<template>
  <div class="row-grid-layout" :class="classes.root">
    <slot />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { activeViewMode } from '@/utilities/activeViewMode'

  const classes = computed(() => {
    return {
      root: {
        'row-grid-layout--grid': activeViewMode.value === 'grid',
        'row-grid-layout--rows': activeViewMode.value === 'rows',
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