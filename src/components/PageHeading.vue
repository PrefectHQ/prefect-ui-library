<template>
  <header class="page-heading">
    <div class="page-heading__leading">
      <div class="page-heading__crumbs">
        <p-bread-crumbs :class="classes" :crumbs="crumbs" />
        <slot name="after-crumbs" />
      </div>
      <slot />
    </div>

    <div class="page-heading__trailing">
      <slot name="actions" />
    </div>
  </header>
</template>

<script lang="ts" setup>
  import { PBreadCrumbs, BreadCrumbs, Size } from '@prefecthq/prefect-design'
  import { PropType, computed } from 'vue'

  const props = defineProps({
    crumbs: {
      type: Array as PropType<BreadCrumbs>,
      required: true,
    },
    size: {
      type: String as PropType<Size>,
      default: 'xl',
    },
  })

  const classes = computed(() => ({
    'page-heading__crumbs--xs': props.size === 'xs',
    'page-heading__crumbs--sm': props.size === 'sm',
    'page-heading__crumbs--md': props.size === 'md',
    'page-heading__crumbs--lg': props.size === 'lg',
    'page-heading__crumbs--xl': props.size === 'xl',
  }))
</script>

<style>
.page-heading,
.page-heading__leading { @apply
  grid
  gap-2
}

.page-heading {
  align-items: start;
}

.page-heading__crumbs { @apply
  flex
  items-center
  justify-start
  gap-2
}

.page-heading__trailing { @apply
  items-center
  justify-start
  grid
  grid-flow-col
  gap-2
}

@screen md {
  .page-heading { @apply
    min-h-[42px]
    flex
    justify-between
  }

  .page-heading__trailing { @apply
    grid
    gap-2
    grid-flow-col
  }
}

.page-heading__crumbs--xs { @apply
  text-xs
}

.page-heading__crumbs--sm { @apply
  text-sm
}

.page-heading__crumbs--md { @apply
  text-base
}

.page-heading__crumbs--lg { @apply
  text-lg
}

.page-heading__crumbs--xl { @apply
  text-xl
}
</style>