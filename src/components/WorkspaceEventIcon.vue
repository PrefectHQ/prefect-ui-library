<template>
  <p-timeline-point class="workspace-event-icon">
    <template v-if="component">
      <component :is="component" :resource="resource" />
    </template>

    <template v-else-if="icon">
      <p-icon :icon="icon" />
    </template>
  </p-timeline-point>
</template>

<script lang="ts" setup>
  import { Icon } from '@prefecthq/prefect-design'
  import { computed } from 'vue'
  import EventResourceBlockDocumentIcon from '@/components/EventResourceBlockDocumentIcon.vue'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEvent } from '@/models/workspaceEvent'

  const props = defineProps<{
    event: WorkspaceEvent,
  }>()

  const resource = computed(() => props.event.resource)
  const { role } = useWorkspaceEventResource(resource)

  const component = computed(() => {
    switch (role.value) {
      case 'block-document':
        return EventResourceBlockDocumentIcon
      default:
        return null
    }
  })

  const icon = computed<Icon | null>(() => {
    switch (role.value) {
      case 'work-queue':
        return 'PWorkPool'
      case 'flow-run':
        return 'FlowRun'
      case 'automation':
        return 'Automation'
      case 'flow':
        return 'Flow'
      case 'deployment':
        return 'PDeployment'
      case 'task-run':
        return 'Task'
      case 'block-document':
        return 'CubeIcon'
      default:
        return null
    }
  })
</script>