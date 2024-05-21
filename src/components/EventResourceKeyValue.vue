<template>
  <p-key-value label="Resource" class="event-resource-key-value" v-bind="{ alternate }">
    <template #value>
      <EventResourceIconText :resource="event.resource" />
    </template>
  </p-key-value>
</template>

<script lang="ts" setup>
  import EventResourceIconText from '@/components/EventResourceIconText.vue'
  import { WorkspaceEvent } from '@/models/workspaceEvent'

  defineProps<{
    event: WorkspaceEvent,
    alternate?: boolean,
  }>()
</script>