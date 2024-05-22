<template>
  <span v-if="show" class="event-resource-flow-run-icon-text">
    <template v-if="id && flowRunName">
      Flow run
      <ResourceLink :resource="resource">
        <p-icon-text icon="FlowRun">
          <span>{{ flowRunName }}</span>
        </p-icon-text>
      </ResourceLink>
    </template>
    <template v-else>
      {{ resourceId }}
    </template>
  </span>
</template>

<script lang="ts" setup>
  import { isDefined } from '@prefecthq/prefect-design'
  import { computed, toRefs } from 'vue'
  import { useComponent } from '@/compositions/useComponent'
  import { useFlowRun } from '@/compositions/useFlowRun'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { ResourceLink } = useComponent()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const flowRunId = computed(() => name.value ? null : id.value)
  const { flowRun, subscription } = useFlowRun(flowRunId)

  const flowRunName = computed(() => name.value ?? flowRun.value?.name)
  const show = computed(() => isDefined(flowRunName.value) || subscription.errored)
</script>