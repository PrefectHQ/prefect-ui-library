<template>
  <FlowRunGraphPopover
    v-if="selection.position"
    :position="selection.position"
    @on-close="onClose"
  >
    <h4 class="flow-run-graph-events-popover__label">
      Event
    </h4>
    <EventCard
      class="flow-run-graph-events-popover__content"
      :event-id="selection.id"
      :occurred="selection.occurred"
    />
  </FlowRunGraphPopover>
</template>

<script lang="ts" setup>
  import EventCard from '@/components/EventCard.vue'
  import FlowRunGraphPopover from '@/components/FlowRunGraphPopover.vue'
  import { RunGraphEventSelection } from '@/types'

  defineProps<{
    selection: RunGraphEventSelection,
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
  max-w-sm
}
</style>