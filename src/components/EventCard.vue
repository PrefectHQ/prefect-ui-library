<template>
  <div class="event-card p-background">
    <template v-if="event">
      <WorkspaceEventDescription :event="event" />

      <p-key-value label="Occurred" alternate>
        <template #value>
          <FormattedDate :date="event.occurred" format="numeric" />
        </template>
      </p-key-value>

      <EventResourceKeyValue class="workspace-events-list-item__resource" :event="event" alternate />

      <template v-if="event.related.length">
        <EventRelatedKeyValue :event="event" alternate />
      </template>
    </template>
    <template v-else>
      <p-loading-icon />
    </template>
  </div>
</template>

<script lang="ts" setup>
  import { useSubscription } from '@prefecthq/vue-compositions'
  import { computed } from 'vue'
  import { EventRelatedKeyValue, EventResourceKeyValue } from '@/components'
  import FormattedDate from '@/components/FormattedDate.vue'
  import WorkspaceEventDescription from '@/components/WorkspaceEventDescription.vue'
  import { useWorkspaceApi } from '@/compositions/useWorkspaceApi'

  const props = defineProps<{
    eventId: string,
    occurred: Date,
  }>()

  const api = useWorkspaceApi()

  const eventSubscription = useSubscription(api.events.getEvent, [props.eventId, props.occurred])
  const event = computed(() => eventSubscription.response)
</script>

<style>
.event-card { @apply
  p-3
  rounded-md
  flex
  flex-col
  gap-2
}
</style>