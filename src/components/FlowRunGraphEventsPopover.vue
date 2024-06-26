<template>
  <FlowRunGraphPopover
    v-if="selection.position && selection.occurred"
    :position="selection.position"
    @on-close="onClose"
  >
    <h4 class="flow-run-graph-events-popover__label">
      {{ selection.ids.length }} Events
    </h4>
    <div class="flow-run-graph-events-popover__content">
      <template v-for="id in selection.ids" :key="id">
        <EventCard :event-id="id" :occurred="selection.occurred" />
      </template>
    </div>
  </FlowRunGraphPopover>
</template>

<script lang="ts" setup>
  import EventCard from '@/components/EventCard.vue'
  import FlowRunGraphPopover from '@/components/FlowRunGraphPopover.vue'
  import { RunGraphEventsSelection } from '@/types'

  defineProps<{
    selection: RunGraphEventsSelection,
  }>()

  const emit = defineEmits<{
    'update:selection': [null],
  }>()

  const onClose = (): void => {
    emit('update:selection', null)
  }
</script>

<style>
.flow-run-graph-events-popover__label { @apply
  w-full
  text-xs
  text-subdued
  mb-2
}
.flow-run-graph-events-popover__content { @apply
  flex
  flex-col
  gap-2
  max-w-sm
}
</style>