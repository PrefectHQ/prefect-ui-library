<template>
  <p-key-value label="Resource" class="event-resource-key-value" v-bind="{ alternate }">
    <template #value>
      <EventResourceIconText :resource="event.resource" />
    </template>
  </p-key-value>
</template>

<script lang="ts" setup>
  import { useComponent } from '@/compositions/useComponent'
  import { WorkspaceEvent } from '@/models/workspaceEvent'

  defineProps<{
    event: WorkspaceEvent,
    alternate?: boolean,
  }>()

  const { EventResourceIconText } = useComponent()
</script>