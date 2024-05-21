<template>
  <span v-if="show" class="event-resource-flow-icon-text">
    <template v-if="id && flowName">
      Flow
      <ResourceLink :resource="resource">
        <p-icon-text icon="Flow">
          <span>{{ flowName }}</span>
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
  import { useFlow } from '@/compositions/useFlow'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const flowId = computed(() => name.value ? null : id.value)
  const { flow, subscription } = useFlow(flowId)

  const flowName = computed(() => name.value ?? flow.value?.name)
  const show = computed(() => isDefined(flowName.value) || subscription.errored)
</script>