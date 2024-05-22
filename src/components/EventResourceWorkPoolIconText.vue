<template>
  <span v-if="show" class="event-resource-work-pool-icon-text">
    <template v-if="name || workPoolName">
      Work pool
      <ResourceLink :resource="resource">
        <p-icon-text icon="CpuChipIcon">
          <span>{{ workPoolName }}</span>
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
  import { useWorkPoolById } from '@/compositions/useWorkPoolById'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { ResourceLink } = useComponent()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const workPoolId = computed(() => name.value ? null : id.value)
  const { workPool, subscription } = useWorkPoolById(workPoolId.value)
  const workPoolName = computed(() => name.value ?? workPool.value?.name)
  const show = computed(() => isDefined(workPoolName.value) || subscription.errored)
</script>