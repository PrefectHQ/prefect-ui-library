<template>
  <header class="page-heading">
    <div class="page-heading__leading">
      <p-bread-crumbs :crumbs="crumbs" />

      <div class="page-heading__leading-slot">
        <slot />
      </div>
    </div>

    <div class="page-heading__trailing">
      <slot name="actions" />
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { PBreadCrumbs, BreadCrumbs } from '@prefecthq/prefect-design'

  defineProps<{
    crumbs: BreadCrumbs,
  }>()
</script>

<style>
.page-heading { @apply
  block;
}

.page-heading__leading { @apply
  flex
  items-center
  justify-start;
}

.page-heading__leading-slot { @apply
  ml-2;
}

.page-heading__trailing { @apply
  items-center
  justify-start
  grid
  grid-flow-col
  gap-2;
}

@screen md {
  .page-heading { @apply
    min-h-[42px]
    flex
    justify-between;
  }

  .page-heading__trailing { @apply
    grid
    gap-2
    grid-flow-col;
  }
}
</style>