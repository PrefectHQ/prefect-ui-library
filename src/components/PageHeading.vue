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
  flex
  items-center
  justify-start;
}

.page-heading__trailing > * { @apply
  mr-2;
}

@screen sm {
  .page-heading { @apply
    min-h-[42px]
    flex
    justify-between;
  }

  .page-heading__trailing { @apply
    flex
    items-center
    justify-end;
  }

  .page-heading__trailing > * { @apply
    ml-2;
  }
}
</style>