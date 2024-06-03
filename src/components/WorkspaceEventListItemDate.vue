<template>
  <p-tooltip>
    <div
      class="workspace-event-list-item-date workspace-event-list-item-date__occurred"
      :class="classes.date"
      @pointerenter="onPointerEnter"
      @pointerleave="onPointerLeave"
    >
      <span class="workspace-event-list-item-date__event-time">{{ event.occurredTime }}</span>
      <span class="workspace-event-list-item-date__event-date">{{ event.occurredDate }}</span>
    </div>

    <template #content>
      <div class="workspace-event-list-item-date__tooltip" @pointerenter="onPointerEnter" @pointerleave="onPointerLeave">
        <p-link :to="filterSinceRoute">
          <p-icon-text icon="ArrowSmallRightIcon">
            Events since
          </p-icon-text>
        </p-link>
        <p-link :to="filterUntilRoute">
          <p-icon-text icon="ArrowSmallLeftIcon">
            Events until
          </p-icon-text>
        </p-link>
      </div>
    </template>
  </p-tooltip>
</template>

<script lang="ts" setup>
  import { TimelineLayout } from '@prefecthq/prefect-design'
  import { useChartCursor, useChartSelection } from '@prefecthq/vue-charts'
  import { computed } from 'vue'
  import { useRoute } from 'vue-router'
  import { useWorkspaceRoutes } from '@/compositions/useWorkspaceRoutes'
  import { WorkspaceEvent } from '@/models/workspaceEvent'
  import { withQuery } from '@/utilities/routes'

  const props = defineProps<{
    event: WorkspaceEvent,
    startDate: Date,
    endDate: Date,
    layout: TimelineLayout,
  }>()

  const { cursor } = useChartCursor()
  const { selectionStart, selectionEnd } = useChartSelection()
  const routes = useWorkspaceRoutes()
  const route = useRoute()

  const classes = computed(() => ({
    date: `workspace-event-list-item-date__occurred--${props.layout}`,
  }))

  function onPointerEnter(): void {
    cursor.value = props.event.occurred
  }

  function onPointerLeave(): void {
    cursor.value = null
  }

  const filterSinceRoute = computed(() => {
    const start = props.event.occurred
    const end = selectionEnd.value ?? props.endDate
    const query = {
      ...route.query,
      'since': start.toISOString(),
      'until': end.toISOString(),
    }

    return withQuery(routes.events(), query)
  })

  const filterUntilRoute = computed(() => {
    const start = selectionStart.value ?? props.startDate
    const end = props.event.occurred
    const query = {
      ...route.query,
      'since': start.toISOString(),
      'until': end.toISOString(),
    }

    return withQuery(routes.events(), query)
  })
</script>

<style>
.workspace-event-list-item-date__occurred { @apply
  relative
  flex
  flex-col
  text-sm
  w-24
  shrink-0
  self-start
}

.workspace-event-list-item-date__occurred--date-right,
.workspace-event-list-item-date__occurred--stacked-right { @apply
  mt-0.5
  items-end
}

.workspace-event-list-item-date__event-date { @apply
  text-xs
  text-subdued
  leading-5
}

.workspace-event-list-item-date__tooltip { @apply
  grid
  grid-cols-1
  gap-1
}
</style>