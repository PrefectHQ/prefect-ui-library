<template>
  <span v-if="show" class="event-resource-deployment-icon-text">
    <template v-if="id && deploymentName">
      Deployment
      <ResourceLink :resource="resource">
        <p-icon-text icon="PDeployment">
          <span>{{ deploymentName }}</span>
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
  import { useDeployment } from '@/compositions/useDeployment'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { ResourceLink } = useComponent()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const deploymentId = computed(() => name.value ? null : id.value)
  const { deployment, subscription } = useDeployment(deploymentId)

  const deploymentName = computed(() => name.value ?? deployment.value?.name)
  const show = computed(() => isDefined(deploymentName.value) || subscription.errored)
</script>