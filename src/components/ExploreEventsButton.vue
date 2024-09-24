<template>
  <p-button :to="filterRoute" icon="SparklesIcon" class="explore-events-button" size="sm">
    <span class="explore-events-button__label">Explore events</span>
  </p-button>
</template>

<script lang="ts" setup>
  import { computed } from 'vue'
  import { useWorkspaceRoutes } from '@/compositions'
  import { PartialWorkspaceEventsFilter } from '@/types'
  import { withQuery } from '@/utilities/routes'

  const props = defineProps<{
    filter: PartialWorkspaceEventsFilter,
    selectionStart?: Date | null,
    selectionEnd?: Date | null,
  }>()

  const routes = useWorkspaceRoutes()

  const filterRoute = computed(() => {
    const { id = [], idPrefix = [] } = props.filter.anyResource ?? {}
    const resource = [...id, ...idPrefix]

    return withQuery(routes.events(), {
      resource,
      since: props.selectionStart?.toISOString(),
      until: props.selectionEnd?.toISOString(),
    })
  })
</script>

<style>
.explore-events-button:hover .explore-events-button__label { @apply
  ml-0;
  width: 100px;
}

.explore-events-button__label { @apply
  transition-all
  overflow-hidden
  whitespace-nowrap
  w-0
  -ml-1
}
</style>