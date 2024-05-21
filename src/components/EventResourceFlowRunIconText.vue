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
  import ResourceLink from '@/components/ResourceLink.vue'
  import { useFlowRun } from '@/compositions/useFlowRun'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const flowRunId = computed(() => name.value ? null : id.value)
  const { flowRun, subscription } = useFlowRun(flowRunId)

  const flowRunName = computed(() => name.value ?? flowRun.value?.name)
  const show = computed(() => isDefined(flowRunName.value) || subscription.errored)
</script>