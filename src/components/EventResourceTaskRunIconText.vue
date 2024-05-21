<template>
  <span v-if="show" class="event-resource-task-run-icon-text">
    <template v-if="id && taskRunName">
      Task run
      <ResourceLink :resource="resource">
        <p-icon-text icon="MapPinIcon">
          <span>{{ taskRunName }}</span>
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
  import { useTaskRun } from '@/compositions/useTaskRun'
  import { useWorkspaceEventResource } from '@/compositions/useWorkspaceEventResource'
  import { WorkspaceEventResource } from '@/models/api/workspaceEvents'

  const props = defineProps<{
    resource: WorkspaceEventResource,
  }>()

  const { resource } = toRefs(props)
  const { id, name, resourceId } = useWorkspaceEventResource(resource)
  const taskRunId = computed(() => name.value ? null : id.value)
  const { taskRun, subscription } = useTaskRun(taskRunId)

  const taskRunName = computed(() => name.value ?? taskRun.value?.name)
  const show = computed(() => isDefined(taskRunName.value) || subscription.errored)
</script>