<template>
  <p-tabs v-model:selected="tab" :tabs="['Details', 'Raw']" class="workspace-event-details">
    <template #details>
      <p-content>
        <p-key-value label="Event" :value="event.event" />
        <p-key-value label="Occurred" :value="event.occurredFormatted" />
        <EventResourceKeyValue :event="event" />
        <EventRelatedKeyValue :event="event" />
      </p-content>
    </template>

    <template #raw>
      <p-code-highlight lang="json" :text="stringify(event)" />
    </template>
  </p-tabs>
</template>

<script lang="ts" setup>
  import { useRouteQueryParam } from '@prefecthq/vue-compositions'
  import EventRelatedKeyValue from '@/components/EventRelatedKeyValue.vue'
  import EventResourceKeyValue from '@/components/EventResourceKeyValue.vue'
  import { WorkspaceEvent } from '@/models/workspaceEvent'
  import { stringify } from '@/utilities/json'

  defineProps<{
    event: WorkspaceEvent,
  }>()

  const tab = useRouteQueryParam('tab', 'Details')
</script>