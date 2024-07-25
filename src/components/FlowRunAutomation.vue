<template>
  <div v-if="automationId" class="flow-run-automation">
    <span>Automation</span> <AutomationIconText :automation-id />
  </div>
</template>

<script setup lang="ts">
  import { addMinutes, subMinutes } from 'date-fns'
  import { computed } from 'vue'
  import AutomationIconText from '@/components/AutomationIconText.vue'
  import { useWorkspaceEvents } from '@/compositions/useWorkspaceEvents'
  import { FlowRun } from '@/models/FlowRun'
  import { getResourceIdParts } from '@/utilities/events'

  const props = defineProps<{
    flowRun: FlowRun,
  }>()

  const { events } = useWorkspaceEvents(() => {
    if (!props.flowRun.expectedStartTime) {
      return null
    }

    // purposefully adding some margin around the expectedStartTime
    // because the automation being executed should happen prior to the time the run was scheduled
    const until = addMinutes(props.flowRun.expectedStartTime, 5)
    const since = subMinutes(props.flowRun.expectedStartTime, 5)

    return {
      event: {
        name: ['prefect-cloud.automation.action.executed', 'prefect.automation.action.executed'],
      },
      resource: {
        idPrefix: ['prefect-cloud.automation', 'prefect.automation'],
      },
      related: {
        id: [`prefect.flow-run.${props.flowRun.id}`],
      },
      occurred: {
        since,
        until,
      },
      limit: 1,
    }
  })

  const automationId = computed(() => {
    if (!events.value.length) {
      return null
    }

    const [event] = events.value
    const { id, role } = getResourceIdParts(event.resource['prefect.resource.id'])

    if (role !== 'automation') {
      return null
    }

    return id
  })
</script>

<style>
.flow-run-automation { @apply
  flex
  gap-1
}
</style>