<template>
  <span v-if="show" class="event-resource-work-queue-icon-text">
    <template v-if="id && workQueueName">
      Work queue
      <ResourceLink :resource="resource">
        <p-icon-text icon="PWorkPool">
          <span v-if="workPoolName">{{ workPoolName }} > </span>
          <span>{{ workQueueName }}</span>
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
  import { useWorkPoolQueue } from '@/compositions/useWorkPoolQueue'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/workspaceEvent'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { ResourceLink } = useComponent()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const workQueueId = computed(() => name.value ? null : id.value)
  const { workPoolQueue, subscription } = useWorkPoolQueue(workQueueId)

  const workQueueName = computed(() => name.value ?? workPoolQueue.value?.name)
  const workPoolName = computed(() => workPoolQueue.value?.workPoolName)
  const show = computed(() => isDefined(workQueueName.value) || subscription.errored)
</script>