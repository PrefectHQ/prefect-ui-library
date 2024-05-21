<template>
  <span v-if="show" class="event-resource-deployment-icon-text">
    <template v-if="id && deploymentName">
      Deployment
      <ResourceLink :resource="resource">
        <p-icon-text icon="MapPinIcon">
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
  import ResourceLink from '@/components/ResourceLink.vue'
  import { useDeployment } from '@/compositions/useDeployment'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const deploymentId = computed(() => name.value ? null : id.value)
  const { deployment, subscription } = useDeployment(deploymentId)

  const deploymentName = computed(() => name.value ?? deployment.value?.name)
  const show = computed(() => isDefined(deploymentName.value) || subscription.errored)
</script>