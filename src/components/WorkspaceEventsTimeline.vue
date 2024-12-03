<template>
  <p-timeline :items="events" class="workspace-events-timeline" :layout="layout">
    <template #date="{ item: event }">
      <template v-if="isWorkspaceEvent(event)">
        <WorkspaceEventListItemDate v-bind="{ event, startDate, endDate, layout }" />
      </template>
    </template>
    <template #point="{ item: event }">
      <template v-if="isWorkspaceEvent(event)">
        <WorkspaceEventIcon :event="event" />
      </template>
    </template>
    <template #content="{ item: event }">
      <template v-if="isWorkspaceEvent(event)">
        <WorkspaceEventsTimelineContent :event="event" />
      </template>
    </template>
  </p-timeline>
</template>

<script lang="ts" setup>
  import { TimelineItem, TimelineLayout, media } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import WorkspaceEventIcon from '@/components/WorkspaceEventIcon.vue'
  import WorkspaceEventListItemDate from '@/components/WorkspaceEventListItemDate.vue'
  import WorkspaceEventsTimelineContent from '@/components/WorkspaceEventsTimelineContent.vue'
  import { WorkspaceEvent, isWorkspaceEvent } from '@/models/workspaceEvent'

  type WorkspaceEventTimelineItem = TimelineItem & WorkspaceEvent

  const props = defineProps<{
    events: WorkspaceEventTimelineItem[],
    startDate: Date,
    endDate: Date,
    layout?: TimelineLayout,
  }>()

  const layout = computed<TimelineLayout>(() => {
    if (props.layout) {
      return props.layout
    }

    return media.sm ? 'date-left' : 'stacked-left'
  })
</script>

<style>
.workspace-events-timeline {
  --p-timeline-item-date-width: theme('spacing.24')
}

.workspace-events-timeline__content { @apply
  gap-2
}
</style>